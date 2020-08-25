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

let unHighlightAllRows = async () => {
    console.log('unhighlighting')
    let rows = document.querySelectorAll('ytcp-video-row')
    for(let i = 0; i < rows.length; ++i) {
        rows[i].removeAttribute('is-highlighted')
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
    console.log(numVideos)
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
                        if(time >= 10) {
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
    return true
}

let initalizeObserver = async () => {
    console.log('creating observer')
    let rows = await document.querySelectorAll('ytcp-video-row')
    let targetNode = rows[rows.length - 1]
    //console.log(targetNode)
    let observerCallback = async (mutations, observer) => { 
        console.log("mutations from observer: ", mutations)
        console.log("collecting page links")
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

let openTabs = () => {
    let openCounter = 0
    for(let i = 0; i < sub10MinVids.length; ++i){
        console.log(sub10MinVids[i].href)
        openCounter++
        window.open(sub10MinVids[i].href, '_blank')
        if(openCounter === 1)
        {
            //console.log('sleeping')
            openCounter = 0
            await sleep(6000)
        }
    }
    
    openCounter = 0
    for(let i = 0; i < plus10MinVides.length; ++i){
        console.log(`10+ min video: `,  plus10MinVides[i].href)
        openCounter++
        window.open(plus10MinVides[i].href, '_blank')
        if(openCounter === 1)
        {
            //console.log('sleeping')
            openCounter = 0
            await sleep(9000)
        }
    }
}

let mainLoop = async () => {
    console.log('entering main loop')
    while( _currentPage < _pageCount ) { 
        console.log('collecting page links: ', _currentPage)
        await sleep(2000)
        await collectPageLinks()
        await navigateForward()
        await sleep(4000)
        ++_currentPage   
    }
    console.log('All links scraped, opening tabs')
    // from this point on, the two arrays should have the links sorted
    openTabs()
}

let main = async () => {
    _pageCount = await getPageCount()
    console.log(`page count: ${_pageCount}`)
    await initalizeObserver()
    await highlightAllRows()
}

//get link elems 
//let elems = await document.querySelectorAll("div#hover-items")

main()
