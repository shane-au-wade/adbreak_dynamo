/**
 * phase 2: check the boxes on each page to ensure that ads are turned on
 */
console.log('check boxes script loaded')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const checkBoxesTimed = (initTime, loopSleepTime, saveTime) => {
    console.log('timer start: ', initTime)
    setTimeout(async () => {
        console.log('checking boxes now')

        // click the check boxes 3 times in total
        for(let loop = 0; loop < 3; ++loop)
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
                }
            }

            await sleep(loopSleepTime)
        }
        

        setTimeout( async() => {
            let buttons = document.getElementsByTagName("ytcp-button")
            for(let i = 0; i < buttons.length; ++i) {
                if(buttons[i].id === 'save') {
                    console.log('changes saved')
                    buttons[i].click()
                }
            }

            setTimeout(async () => {
                console.log('closing now')
                let checkBoxs = await document.getElementsByTagName("ytcp-checkbox-lit")
                //console.log('check box of interest:',checkBoxs )
                console.log(checkBoxs[6].getAttribute("aria-disabled"))
                if(checkBoxs[6].getAttribute("aria-disabled") == 'true') {
                    //this is not a 10 minute vid
                    open(location, '_self').close();
                }
            },5000)
            

        }, saveTime)
       
    }, initTime)
}

document.addEventListener('readystatechange', (event) => {
    //console.log(`readystate: ${document.readyState}\n`);

    if(document.readyState === 'complete')
    {
        setTimeout( () => {
            //ytcp-animatable.page.selected.style-scope.ytcp-app
            let targetNode = document.querySelector('ytcp-app')
            console.log(targetNode)
            let observerCallback = (mutations, observer) => { 
                
                // console.log('child added: ', mutations[mutations.length -1].target) 
                // console.log('whole node:', mutations[mutations.length -1])
                if(mutations[mutations.length -1].target.localName == 'iron-icon' && mutations[mutations.length -1].target.className == 'icon-right style-scope ytcp-anchor') {
                    console.log('all elements loaded')
                    checkBoxesTimed(1000, 1000, 1000)
                }
            }
            let observerConfig = {
                childList:true,
                subtree:true
            }
            const observer = new MutationObserver( observerCallback )
            observer.observe(targetNode, observerConfig)
        }, 1000)
       
        checkBoxesTimed(60000, 3000, 3000)
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

