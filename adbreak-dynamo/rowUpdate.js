console.log('row update script loaded')
// const runAdbreakAuto = () => {

//     if(document.location.href.indexOf("https://studio.youtube.com/channel") >= 0) // if this is the
//     {
//         let videoRows = document.getElementsByTagName("ytcp-video-row")

//         for(let j = 0; j < videoRows.length; ++j) {
//             videoRows[j].isHighlighted = true;
//         }

//         setTimeout(() => {
//             let elems = document.getElementsByClassName("style-scope ytcp-video-list-cell-video hover-item")
//             for(let i = 0; i < elems.length; ++i){
//                 if(elems[i].href) {
//                     if(elems[i].href.indexOf('monetization') >= 0){
//                     console.log(elems[i].href)
//                     window.open(elems[i].href, '_blank')
//                     }
//                 }
//             }
//         }, 1000)
//     }
//     else{
//         alert('Unable to run ad break auto on this page')
//     }
    
// }

// const showMonetization = async () => {
//     console.log('showing monetization icons')
//     let videoRows = await document.getElementsByTagName("ytcp-video-row")
//     //console.log(videoRows)
//     for(let j = 0; j < videoRows.length; ++j) {
//         videoRows[j].onMouseOver()
//     }
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const openTabs = () => {
    console.log('opening tabs')
    let elems = document.getElementsByClassName("style-scope ytcp-video-list-cell-video hover-item")
            
    setTimeout( async () => {
        let openCounter = 0
        for(let i = 0; i < elems.length; ++i){
                        if(elems[i].href) {
                            if(elems[i].href.indexOf('monetization') >= 0){
                            console.log(elems[i].href)
                            openCounter++
                            window.open(elems[i].href, '_blank')
                            }
                            
                            if(openCounter === 1)
                            {
                                //console.log('sleeping')
                                openCounter = 0
                               await sleep(3000)
                            }
                        }
                    }
    }, 1000)
  
}

document.addEventListener('readystatechange', (event) => {
    //console.log(`readystate: ${document.readyState}\n`);

    if(document.readyState === 'complete')
    {   
            setTimeout(async () => {
            let main = document.getElementById('main')
            main.scrollTo(0, main.scrollHeight)
            let possibleMenusArr = document.getElementsByTagName("ytcp-dropdown-trigger")

            setTimeout(() => {
                possibleMenusArr[3].click()
                setTimeout(() => {
                    // click on the 50 button item
                    let possibleItems = document.getElementsByTagName('paper-item')
                    console.log(possibleItems.length)
                    
                    for(let i = 0; i < possibleItems.length; ++i) {
                        if(possibleItems[i].getAttribute("test-id") === '50')
                        {
                            console.log('we got the 50 tag')
                            possibleItems[i].click()
                        }
                    }

                    
                    setTimeout(() => {
                        let homeRow = document.getElementsByTagName("ytcp-home-button") // array of items
                        // let highLightButton = homeRow[0].appendChild(document.createElement('button'))
                        // highLightButton.innerText = 'Highlight First'
                        // highLightButton.addEventListener('click', showMonetization) 
                        let runButton = homeRow[0].appendChild(document.createElement('button'))
                        runButton.innerText = "Open Tabs"
                        runButton.addEventListener('click', openTabs)
                    }, 3000)

                }, 1000) // menu option timer
            }, 1000) //scroll wait  
        }, 1000)


    }
});