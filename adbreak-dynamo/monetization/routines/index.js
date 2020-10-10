
console.log('Initializing Monetization Routines')

/**
 * below are monetization routine functions
 */

 /**
  * run the general monetization routine
  */
let generalRoutine = () => {
    /**
     * phase 2: check the boxes on each page to ensure that ads are turned on
     */
    console.log('check boxes script loaded')
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    let sendAdbreaksHTTPRequest = () => {
        let url = `http://localhost:3000/robot/createAdbreaks/1`
        fetch(url, {
            mode: 'no-cors', // no-cors, *cors, same-origin
        });
    }
    
    let sendSkipHTTPRequest = () => {
        let url = `http://localhost:3000/robot/skip`
        fetch(url, {
            mode: 'no-cors', // no-cors, *cors, same-origin
        });
    }
    
    const clearAdbreaks = async () => {
        let adbreakRows = document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
        while(adbreakRows.length != 0) {
            for(let i = 0; i < adbreakRows.length; ++i) {
               adbreakRows[i].children[1].click()
               await sleep(30)
            }
            adbreakRows = document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
            //console.log(adbreakRows.length)
        }
        await sleep(1000)
        sendAdbreaksHTTPRequest()
    }
    
    const clickUncheckedEnabledBoxes = async () => {
        let uncheckedAdType = document.querySelectorAll('ytcp-checkbox-lit[aria-checked="false"][aria-disabled="false"')
        while(uncheckedAdType.length != 0) {
            for(let i = 0; i < uncheckedAdType.length; ++i) {
                uncheckedAdType[i].click()
                await sleep(30)
            }
            uncheckedAdType = document.querySelectorAll('ytcp-checkbox-lit[aria-checked="false"][aria-disabled="false"')
        }
        return true
    }
    
    const isVideoLong = async () => {
        let timeStamp = await document.querySelector('ytcp-thumbnail.thumbnail.video-thumbnail.style-scope.ytcp-navigation-drawer div div.timestamp.style-scope.ytcp-thumbnail div').innerText
        let timeArr = timeStamp.split(':')
        let minutes = parseInt(timeArr[0])
        if(timeArr.length >= 3) {
            // 1 hour video
            return true
        } else {
            // less than 1 hour video
            if(minutes >= 8) {
                return true
            } else {
                return false
            }
        }
        
    }

    /**
     * open the first long video to start the long video
     * monetization routine
     */

    const longVideoStartRoutine = async (index) => {
        // console.log('<8 minute videos monetized')
        let title = localStorage.getItem('channel')
        let link = localStorage.getItem(0)
        url = `http://localhost:3000/notify/short-end/${title}/${index}`
        fetch(url, {
            method: 'post',
            mode: 'no-cors', // no-cors, *cors, same-origin
        });
        // Long video monetization routine entrypoint
        let w = window.open("", '_blank')
        await sleep(250)
        w.location = link
        await sleep(750)
        open(location, "_self").close(); 
    }

    /**
     * open the next video and close out the current one
     */

    const shortVideoClosingRoutine = async () => {
        let index = await parseInt(sessionStorage.getItem('index'))
        ++index
        let link = sessionStorage.getItem(index)
        if(link === null) {
            //console.log('the link is null: time to open the long videos')
            longVideoStartRoutine(index)
        } else {
            await sleep(800)
            sessionStorage.setItem('index', index)
            console.log('Opening Link: ', link)
            let w = window.open("", '_blank')
            await sleep(250)
            w.location = link
            await sleep(750)
            open(location, "_self").close(); 
        }
       
    }
    
    const checkBoxes = async () => {
        // check all ad type boxes
        await clickUncheckedEnabledBoxes()
        await sleep(500)
        let longVideo = await isVideoLong()
        // check if the 'during video' box is disabled
        let midRollBoxDisabled = await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").ariaDisabled
        if(midRollBoxDisabled === 'false') {
            // long video with midrolls enabled
            await clickUncheckedEnabledBoxes()
            await document.querySelector('#place-manually-button').click() // open adbreak menu
            await sleep(2000)
            clearAdbreaks() // clear out existing adbreaks
        } else if(longVideo) {
            // long video with midrolls disabled
            sendSkipHTTPRequest()
        } else {
            // short video | save and close window
            console.log('save and close')
            let saveButton = document.querySelector("ytcp-button#save")
            if(saveButton.ariaDisabled === 'true') {
                shortVideoClosingRoutine()
            } else {
                saveButton.click()
                shortVideoClosingRoutine()
            }
            
        }
    }
    
    let initObserver = () => {
        let targetNode = document.querySelector('ytcp-app')
        console.log(targetNode)
        let observerCallback = async (mutations, observer) => {  
            // console.log('child added: ', mutations[mutations.length -1].target) 
            // console.log('whole node:', mutations[mutations.length -1])
            if(mutations[mutations.length -1].target.localName == 'iron-icon' && mutations[mutations.length -1].target.className == 'icon-right style-scope ytcp-anchor') {
                console.log('all elements loaded')
                observer.disconnect()
                setTimeout(() => {document.location.reload()}, 60000*4) //4 minute timeout for all pages
                checkBoxes()
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
        }
    });
    
} // end of main function


/**
 * run the no adbreaks monetization routine
 */
let noAdbreaksRoutine = () => {
   
        /**
     * phase 2: check the boxes on each page to ensure that ads are turned on
     */
    console.log('check boxes script loaded')

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const clickUncheckedEnabledBoxes = async () => {
        let uncheckedAdType = document.querySelectorAll('ytcp-checkbox-lit[aria-checked="false"][aria-disabled="false"')
        while(uncheckedAdType.length != 0) {
            for(let i = 0; i < uncheckedAdType.length; ++i) {
                uncheckedAdType[i].click()
                await sleep(30)
            }
            uncheckedAdType = document.querySelectorAll('ytcp-checkbox-lit[aria-checked="false"][aria-disabled="false"')
        }
        return true
    }

    // const disableMidrollAds = async () => {
    //     let uncheckedAdType = document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings[aria-checked='true']")
    //     while(uncheckedAdType.length != 0) {
    //         for(let i = 0; i < uncheckedAdType.length; ++i) {
    //             uncheckedAdType[i].click()
    //             await sleep(30)
    //         }
    //         uncheckedAdType = document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings[aria-checked='true']")
    //     }
    //     return true
    // }

    const isVideoLong = async () => {
        let timeStamp = await document.querySelector('ytcp-thumbnail.thumbnail.video-thumbnail.style-scope.ytcp-navigation-drawer div div.timestamp.style-scope.ytcp-thumbnail div').innerText
        let timeArr = timeStamp.split(':')
        let minutes = parseInt(timeArr[0])
        if(minutes >= 8) {
            return true
        } else {
            return false
        }
    }

    /**
     * open the first long video to start the long video
     * monetization routine
     */

    const longVideoStartRoutine = async (index) => {
        // console.log('<8 minute videos monetized')
        let title = localStorage.getItem('channel')
        let link = localStorage.getItem(0)
        url = `http://localhost:3000/notify/short-end/${title}/${index}`
        fetch(url, {
            method: 'post',
            mode: 'no-cors', // no-cors, *cors, same-origin
        });
        // Long video monetization routine entrypoint
        let w = window.open("", '_blank')
        await sleep(250)
        w.location = link
        await sleep(750)
        open(location, "_self").close(); 
    }


    /**
     * open the next video and close out the current one
     */

    const shortVideoClosingRoutine = async () => {
        let index = await parseInt(sessionStorage.getItem('index'))
        ++index
        let link = sessionStorage.getItem(index)
        if(link === null) {
            //console.log('the link is null: time to open the long videos')
            longVideoStartRoutine(index)
        } else {
            await sleep(800)
            sessionStorage.setItem('index', index)
            console.log('Opening Link: ', link)
            let w = window.open("", '_blank')
            await sleep(250)
            w.location = link
            await sleep(750)
            open(location, "_self").close(); 
        }
    }

    const saveAndExit = async () => {
        console.log('save and close')
        let saveButton = document.querySelector("ytcp-button#save")
        if(saveButton.ariaDisabled === 'true') {
            shortVideoClosingRoutine()
        } else {
            saveButton.click()
            shortVideoClosingRoutine()
        }
    }

    const openNewPage = async () => {
        console.log('save')
        let saveButton = document.querySelector("ytcp-button#save")
        if(saveButton.ariaDisabled !== 'true') {
            shortVideoClosingRoutine()
            saveButton.click()
        } 
        let index = await parseInt(localStorage.getItem('index'))
        ++index
        let link = localStorage.getItem(index)
        await sleep(800)
        localStorage.setItem('index', index)
        await sleep(250)
        window.open(link)
        await sleep(750)
        open(location, "_self").close(); 
    }

    const checkBoxes = async () => {
        // check all ad type boxes
        await clickUncheckedEnabledBoxes()
        await sleep(500)
        let longVideo = await isVideoLong()
        // check if the 'during video' box is disabled
        let midRollBoxDisabled = await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").ariaDisabled
        if(midRollBoxDisabled === 'false') {
            //8+ minute video
            await clickUncheckedEnabledBoxes()
            await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").click()
            if(!(document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").ariaChecked === 'false')) {
                await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").click()
            }
            await sleep(1000)
            // write logic to update the index of page and open the new page
            openNewPage()
        } else if(longVideo) {
            await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").click()
            if(!(document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").ariaChecked === 'false')) {
                await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").click()
            }
            await sleep(1000)
            openNewPage()
        } else {
            // < 8 minute video, save and close window
            saveAndExit()
        }
    }

    let initObserver = () => {
        let targetNode = document.querySelector('ytcp-app')
        console.log(targetNode)
        let observerCallback = (mutations, observer) => {  
            // console.log('child added: ', mutations[mutations.length -1].target) 
            // console.log('whole node:', mutations[mutations.length -1])
            if(mutations[mutations.length -1].target.localName == 'iron-icon' && mutations[mutations.length -1].target.className == 'icon-right style-scope ytcp-anchor') {
                console.log('all elements loaded')
                observer.disconnect()
                checkBoxes()
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
        }
    });
    
} // end of main function
    

/**
 * main code to execute a specific routine
 */
chrome.storage.local.get(['routine'], function(result) {
    //console.log(result);
    if(result.routine === 'general') {
        console.log('running general routine')
        generalRoutine()
    } 
    else if(result.routine === 'noAdbreaks') {
        console.log('running noAdbreaks routine')
        noAdbreaksRoutine()
    } else {
        //default case to run general routine
        console.log('default: running general routine')
        generalRoutine()
    }
  });