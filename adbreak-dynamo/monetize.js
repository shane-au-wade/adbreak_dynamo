/**
 * phase 2: check the boxes on each page to ensure that ads are turned on
 */
console.log('check boxes script loaded')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let sendAdbreaksHTTPRequest = () => {
    // send a request to the local express server with the
    // approximate number of open tabs 
    let url = `http://localhost:3000/robot/createAdbreaks/1`
    fetch(url, {
        mode: 'no-cors', // no-cors, *cors, same-origin
    });
}

const openAndClearAdbreaks = async () => {
    
    for(let loop = 0; loop < 3; ++loop) {
        let adbreakRows = await document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
        for(let i = 0; i < adbreakRows.length; ++i) {
                let adbreakRows = document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
                if(adbreakRows[i])
                {
                     adbreakRows[i].childNodes[3].click()
                }  
            }
        if((loop + 1) === 3) {
            await sleep(1000)
            sendAdbreaksHTTPRequest()
        }
    }
    
}

const checkBoxesTimed = (initTime, loopSleepTime, saveTime) => {
    console.log('timer start: ', initTime)
    setTimeout(async () => {
        console.log('checking boxes now')

        // click the check boxes 3 times in total
        let checkedBoxes = 0
        for(let loop = 0; loop < 5; ++loop)
        {
            console.log('updating checkboxes: ', loop)
            let checkBoxs = await document.getElementsByTagName("ytcp-checkbox-lit")
            //console.log('checkboxes: ', checkBoxs)

            for(let i = 0; i < checkBoxs.length; ++i){
                //console.log('looping')
                // console.log(checkBoxs[i])
                //console.log(checkBoxs[i].getAttribute("aria-checked"))
                if(checkBoxs[i].getAttribute("aria-checked") == 'false') { 
                        console.log('box clicked!')
                        await checkBoxs[i].click()
                } else {
                    checkedBoxes++
                }
            }

            if(checkedBoxes >= 7){
                console.log("all boxes checked: break")
                break
            } else {
                checkedBoxes = 0
                await sleep(loopSleepTime)
            }
        }
        

        setTimeout( async() => {
            // let buttons = document.getElementsByTagName("ytcp-button")
            // for(let i = 0; i < buttons.length; ++i) {
            //     if(buttons[i].id === 'save') {
            //         console.log('changes saved')
            //         buttons[i].click()
            //     }
            // }

            let saveButton = document.querySelector("ytcp-button#save")
            saveButton.click()

            setTimeout(async () => {
                console.log('closing now')
                let checkBoxs = await document.getElementsByTagName("ytcp-checkbox-lit")
                //console.log('check box of interest:',checkBoxs )
                console.log(checkBoxs[6].getAttribute("aria-disabled"))
                if(checkBoxs[6].getAttribute("aria-disabled") == 'true') {
                    //this is not a 10 minute vid
                    open(location, '_self').close();
                } else {
                    // this is a 8 minute video and we should do ad breaks
                    console.log('run manual adbreak code')
                    await document.querySelector('#place-manually-button').click()
                    await sleep(2000)
                    await openAndClearAdbreaks()
                }
            },1000)
            

        }, saveTime)
       
    }, initTime)
}

let initObserver = () => {
    let targetNode = document.querySelector('ytcp-app')
    console.log(targetNode)
    let observerCallback = (mutations, observer) => { 
        
        // console.log('child added: ', mutations[mutations.length -1].target) 
        // console.log('whole node:', mutations[mutations.length -1])
        if(mutations[mutations.length -1].target.localName == 'iron-icon' && mutations[mutations.length -1].target.className == 'icon-right style-scope ytcp-anchor') {
            console.log('all elements loaded')
            checkBoxesTimed(250, 250, 1000)
        }
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
           initObserver()
        }, 1000)
        //checkBoxesTimed(55000, 3000, 3000)
    }
});

//console.log(document.readyState)
// let checkBoxs = document.getElementsByTagName("ytcp-checkbox-lit")
// for(let i = 0; i < checkBoxs.length; ++i){
//     if(!checkBoxs[i].disabled && checkBoxs[i].checked === false) { // if is not disabled and it is uncheck, check it
//         console.log('box clicked!')
//         checkBoxs[i].click()
//     }
// }

// let buttons = document.getElementsByTagName("ytcp-button")
// for(let i = 0; i < buttons.length; ++i) {
//     if(buttons[i].id === 'save') {
//         buttons[i].click()
//     }
// }

