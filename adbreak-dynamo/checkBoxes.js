/**
 * phase 2: check the boxes on each page to ensure that ads are turned on
 */
console.log('check boxes script loaded')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    }
    
}

const genFormattedString = async (number) => {
    return new Promise ((resolve, reject) => {
        let finalStr = ""
        if(number >= 10) {
            finalStr = finalStr + number + ':00'
            resolve(finalStr)
        }
        else {
            finalStr = finalStr + '0' + number + ':00'
            resolve(finalStr)
        }
    })

}

/**
 * 
 * @param {time interval in minutes} timeInterval 
 */
// adbreakRows[0].childNodes[5].childNodes[3].childNodes[0].childNodes[0].isFocused = true

const createTimes = async (timeInterval) => { 
    
    function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; 
    
    const genFormattedString = (number) => {
         return new Promise ((resolve, reject) => {
              let finalStr = ""; 
                if(number < 10) {
                    finalStr = finalStr + "0" + number + ":00"; 
                    resolve(finalStr); 
                } else if(number >= 10 && number < 60) { 
                    finalStr = finalStr + number + ":00"; 
                    resolve(finalStr); 
                } else if(number >= 60) { 
                    let hours = number/60;
                    hours = Math.floor(hours);
                    number -= hours*60;
                        if(number< 10)
                        {
                            finalStr = finalStr + hours + ":0" + number + ":00";
                        } else {
                            finalStr = finalStr + hours + ":" + number + ":00";
                        }
                    resolve(finalStr);
                } 
            }); 
        }; 

        let timeStamp = await document.querySelector("div.label.style-scope.ytcp-thumbnail").innerText; 
        let adBreaksButton = await document.querySelector("#add-ad-break");
        let timeArr = timeStamp.split(":"); 
        // let urlEnter = 'http://localhost:3000/enter'
        // let urlClick = 'http://localhost:3000/click'
        let urlTypeValue = "http://localhost:3000/typevalue/"
        if( timeArr.length === 3)
        {
            let hours = parseInt(timeArr[0]);
            let additionalMins = hours*60;
            let vidMinutes = parseInt(timeArr[1]); 
            vidMinutes += additionalMins;
            vidMinutes = vidMinutes/timeInterval; 
            let interval = Math.floor(vidMinutes); 

            for(let i=0; i < interval; ++i) {
                adBreaksButton.click();
                await sleep(100);
            };

            for(let i=0; i < interval; ++i) {
             let inputs = await document.querySelectorAll("ytve-formatted-input"); 
             //await inputs[0].onFocus(); 
             let val = (i + 1)*timeInterval; 
             inputs[0].childNodes[1].value = await genFormattedString(val); 
             await fetch(url, {
                mode: 'no-cors', // no-cors, *cors, same-origin
              });
             //inputs[0].onBlur(); 
             await sleep(500); 
            } 
        } else {
            let vidMinutes = parseInt(timeArr[0]); 
             vidMinutes = vidMinutes/timeInterval; 
            let interval = Math.floor(vidMinutes); 

            for(let i=0; i < interval; ++i) {
                adBreaksButton.click();
                await sleep(100);
            };

            for(let i=0; i < interval; ++i) {   
                let val = (i + 1)*timeInterval; 
                let finalUrl = urlTypeValue + val
                await fetch(finalUrl, {
                    mode: 'no-cors', // no-cors, *cors, same-origin
                });
                await sleep(1000); 
            }; 
        }
        
        
        // save feature code
         
        // let con = await document.querySelector("#save-button");
        // con.click();
        // setTimeout( () => {
        //     let buttons = document.getElementsByTagName("ytcp-button");
        //     for(let i = 0; i < buttons.length; ++i) {
        //         if(buttons[i].id === "save") {
        //             console.log("changes saved");
        //             buttons[i].click();
        //         }
        //     }

        //     setTimeout( () => {
        //         open(location, "_self").close();
        //     }, 3000);

        // }, 2000);
       
};

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
                    // this is a 10 minute video and we should do ad breaks
                    console.log('running manual adbreak code')
                    await document.querySelector('#place-manually-button').click()
                    await sleep(2000)
                    await openAndClearAdbreaks()
                    // await sleep(1000)
                    // await createTimes(4)
                    // let title = await document.querySelector('#dialog-title')
                    // let button = title.appendChild(document.createElement('button'))
                    // button.innerText = 'create adbreaks'
                    // button.addEventListener('click', () => {createAdbreaks(4)})
                }
            },1000)
            

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
                    checkBoxesTimed(250, 250, 1000)
                }
            }
            let observerConfig = {
                childList:true,
                subtree:true
            }
            const observer = new MutationObserver( observerCallback )
            observer.observe(targetNode, observerConfig)
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

