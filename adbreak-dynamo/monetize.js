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

const clearAdbreaks = async () => {
    let adbreakRows = document.querySelectorAll('div.ad-break-row.style-scope.ytve-ad-breaks-editor-options-panel')
    while(adbreakRows.length != 0) {
        for(let i = 0; i < adbreakRows.length; ++i) {
           adbreakRows[i].children[1].click()
           await sleep(10)
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
            await sleep(10)
        }
        uncheckedAdType = document.querySelectorAll('ytcp-checkbox-lit[aria-checked="false"][aria-disabled="false"')
    }
    return true
}

const checkBoxes = async () => {
    // check all ad type boxes
    await clickUncheckedEnabledBoxes()
    await sleep(1000)
    // check if the 'during video' box is disabled
    let midRollBoxDisabled = await document.querySelector("ytcp-checkbox-lit.midroll-ad-break.style-scope.ytpp-ad-breaks-settings").ariaDisabled
    if(midRollBoxDisabled === 'false') {
        //8+ minute video
        await clickUncheckedEnabledBoxes()
        await document.querySelector('#place-manually-button').click() // open adbreak menu
        await sleep(2000)
        clearAdbreaks() // clear out existing adbreaks
    } else {
        // < 8 minute video, save and close window
        console.log('save and close')
        await document.querySelector("ytcp-button#save").click()
        await sleep(2000)
        open(location, '_self').close();
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