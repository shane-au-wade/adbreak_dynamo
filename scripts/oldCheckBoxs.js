const clearAdbreaks = async () => {
    for(let loop = 0; loop < 3; ++loop) {
        let adbreakRows = document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
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


