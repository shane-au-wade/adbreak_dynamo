console.log('row update script loaded')
var sub10MinVids = [] // global list of < 10min videos
var plus10MinVides = [] // global list of > 10min videos
var _pageCount = 0 // global page count
var _currentPage = 0
// helper sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function to hover over all vid rows to 
// expose the monetization icon that has the 
// link to the monetization page
let highlightAllRows = async () => {
    console.log('highlighting')
    let rows = document.querySelectorAll('ytcp-video-row')
    for(let i = 0; i < rows.length; ++i) {
        rows[i].setAttribute('is-highlighted',"")
        if((i + 1) === rows.length) {
            return true
        }
    }
}

// get the number of pages needed to 
let getPageCount = async () => {
    let vidString = document.querySelector("span.page-description.style-scope.ytcp-table-footer").innerText
    let strArr = vidString.split(" ")
    let numVideos = parseInt(strArr[strArr.length - 1]) 
    console.log('number of videos: ', numVideos)
    //assuming that 50 videos are show per page
    let pageCount = Math.ceil(numVideos/50)
    return pageCount
}

let collectPageLinks = async () => {
    
    let elems = document.querySelectorAll('div#hover-items')
    let timeStamps = document.querySelectorAll("div.label.style-scope.ytcp-thumbnail")
    // let sub10MinVids = []
    // let plus10MinVides = []
   
        for(let i = 0; i < elems.length; ++i){
            if(elems[i].children[3]) { // the monitization link exisits
                    let time = timeStamps[i].innerText
                    let timeArr = time.split(":")
                    if(timeArr.length >= 3)
                    {
                        //hour long video
                        console.log("hour long video")
                        plus10MinVides.push(elems[i].children[3].href)
                    } else {
                        time = parseInt(timeArr[0])
                        if(time >= 8) {
                            console.log("")
                            plus10MinVides.push(elems[i].children[3].href)
                        } else {
                            sub10MinVids.push(elems[i].children[3].href)
                        }
                    }
            }

            if((i+1) === elems.length) {
                console.log(sub10MinVids)
                console.log(plus10MinVides)
                return true
            }
        }
        // from this point on, the two arrays should have the links sorted
}

let navigateForward = async () => {
    let navForward = document.querySelector("ytcp-icon-button#navigate-after")
    navForward.click()
    if(navForward.ariaDisabled === 'true')
    {
        return false // no more pages
    } else {
        return true // more pages to go
    }
}

let openTabs = async () => {
    // open shorter length videos first
    let openCounter = 0
    for(let i = 0; i < sub10MinVids.length; ++i){
        console.log(sub10MinVids[i])
        openCounter++
        window.open(sub10MinVids[i], '_blank')
        if(openCounter === 1)
        {
            //console.log('sleeping')
            openCounter = 0
            await sleep(6500)
        }
    }
    console.log('<8 minute videos monetized')

    // begin 8+ minute video monetization routine
    localStorage.setItem('links', JSON.stringify(plus10MinVides))
    localStorage.setItem('index', 0)
    await sleep(1000) // let local storage code execute
    console.log('Starting 8+ minute video monetization')
    window.open(plus10MinVides[0])
}

let mainLoop = async () => {
    console.log('entering main loop')
    let morePages =  true
    while(morePages) { 
        console.log('collecting page links: ', _currentPage)
        await sleep(2000)
        await collectPageLinks()
        morePages = await navigateForward()
        await sleep(2000)
        console.log('more pages: ', morePages)
        ++_currentPage   
    }
    console.log('All links scraped, opening tabs')
    // from this point on, the two arrays should have the links sorted
    openTabs()
}

let initalizeObserver = async () => {
    console.log('creating observer')
    let rows = await document.querySelectorAll('ytcp-video-row')
    let targetNode = rows[rows.length - 1]
    //console.log(targetNode)
    let observerCallback = async (mutations, observer) => { 
        //console.log("mutations from observer: ", mutations)
        console.log('mutation detected on last video')
        observer.disconnect()
        mainLoop()
    }
    let observerConfig = {
        subtree:true, 
        attributes: true
    }
    const observer = new MutationObserver( observerCallback )
    observer.observe(targetNode, observerConfig)
    return true
}

let main = async () => {
    _pageCount = await getPageCount()
    console.log(`page count: ${_pageCount}`)
    await initalizeObserver()
    await highlightAllRows()
}

let createMonetizeButton = () => {
    let homeRow = document.getElementsByTagName("ytcp-home-button") // array of items
    // let highLightButton = homeRow[0].appendChild(document.createElement('button'))
    // highLightButton.innerText = 'Highlight First'
    // highLightButton.addEventListener('click', highlightAllRows) 
    let runButton = homeRow[0].appendChild(document.createElement('button'))
    runButton.innerText = "Monetize Channel"
    runButton.style.cssText = 
    `
    margin-left: 20px; 
    border-radius: 10px; 
    padding: 10px;
    background-color: red; 
    color: #ffffff; font-weight: 700; 
    border: none;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12);
    `
    runButton.addEventListener('click', main)
    console.log('Adbreak Dynamo Ready')
}

let initStartObserver = () => {
    let targetNode = document.querySelector('ytcp-app')
    //console.log(targetNode)
    let observerCallback = async (mutations, observer) => { 
        //console.log('mutations: ', mutations)
        console.log('page loaded')
        observer.disconnect()
        // scroll to bottom of page
        let mainBody = document.getElementById('main')
        mainBody.scrollTo(0, main.scrollHeight)
        await sleep(1000)
        // click down menu
        let dropDownMenu = document.querySelector('ytcp-table-footer#footer ytcp-text-dropdown-trigger#trigger')
        dropDownMenu.click()
        await sleep(1000)
        //click on the 50 button item
        let dropDown50Option = document.querySelector('paper-item[test-id="50"]')
        dropDown50Option.click()
        await sleep(2000)
        createMonetizeButton()
    }
    let observerConfig = {
        childList:true,
        subtree:true
    }
    const observer = new MutationObserver( observerCallback )
    observer.observe(targetNode, observerConfig)
}

document.addEventListener('readystatechange', (event) => {
    //console.log(`readystate: ${document.readyState}\n`);
    if(document.readyState === 'complete')
    {
        setTimeout( () => {
            initStartObserver()
        }, 1000)
    }
});

// document.addEventListener('readystatechange', (event) => {
//     //console.log(`readystate: ${document.readyState}\n`);

//     if(document.readyState === 'complete')
//     {   
//             setTimeout(async () => {
//             let mainBody = document.getElementById('main')
//             mainBody.scrollTo(0, main.scrollHeight)

//             setTimeout(() => {
//                 let dropDownMenu = document.querySelector('ytcp-table-footer#footer ytcp-text-dropdown-trigger#trigger')
//                 dropDownMenu.click()
//                 setTimeout(() => {
//                     // click on the 50 button item
//                     let dropDown50Option = document.querySelector('paper-item[test-id="50"]')
//                     dropDown50Option.click()

//                     setTimeout(() => {
//                         createMonetizeButton()
//                     }, 2000)

//                 }, 1000) // menu option timer
//             }, 1000) //scroll wait  
//         }, 1000)
//     }
// });