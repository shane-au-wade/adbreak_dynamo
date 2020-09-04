/**
 * phase 2: check the boxes on each page to ensure that ads are turned on
 */
console.log('check boxes script loaded')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    await document.querySelector("#save-button").click(); // continue button
    await sleep(800)
    await document.querySelector('div#tab-button-container ytcp-button#save').click()
    return true
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
    if(minutes >= 8) {
        return true
    } else {
        return false
    }
}

const saveAndExit = async () => {
    console.log('save and close')
    let saveButton = document.querySelector("ytcp-button#save")
    if(saveButton.ariaDisabled === 'true') {
        open(location, '_self').close();
    } else {
        saveButton.click()
        await sleep(2000)
        open(location, '_self').close();
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
        //8+ minute video
        await clickUncheckedEnabledBoxes()
        await document.querySelector('#place-manually-button').click() // open adbreak menu
        await sleep(2000)
        await clearAdbreaks() // clear out existing adbreaks
        saveAndExit() 
    } else if(longVideo) {
        sendSkipHTTPRequest()
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