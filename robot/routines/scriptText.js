let adbreakConfig = {
    timeInterval: 4
}

let updateTimeInterval = (t) => {
    adbreakConfig.timeInterval = t
}

let createTimes = async () => {
    return (
            `
            // let url = 'http://localhost:3000/robot/handshake'
            // fetch(url, {
            //     mode: 'no-cors', // no-cors, *cors, same-origin
            // });
            const createTimes = async (timeInterval) => { 
                function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; 
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
                    return true
                }
                const genFormattedString = (number) => { 
                    return new Promise ((resolve, reject) => { 
                        let finalStr = ""; 
                        if(number < 10) { 
                            finalStr = finalStr + "0" + number + ":00"; 
                            resolve(finalStr); 
                        } else if(number >= 10 && number < 60) { 
                            finalStr = finalStr + number + ":00"; resolve(finalStr); 
                        } else if(number >= 60) { 
                            let hours = number/60; hours = Math.floor(hours); 
                            number -= hours*60; 
                            if(number< 10) { 
                                finalStr = finalStr + hours + ":0" + number + ":00"; 
                            } else { 
                                finalStr = finalStr + hours + ":" + number + ":00"; 
                            } 
                            resolve(finalStr); } 
                        }); 
                    }; 
                    await clearAdbreaks()    
                    let timeStamp = await document.querySelector('ytcp-thumbnail.thumbnail.video-thumbnail.style-scope.ytcp-navigation-drawer div div.timestamp.style-scope.ytcp-thumbnail div').innerText; 
                    let adBreaksButton = await document.querySelector("#add-ad-break"); 
                    let timeArr = timeStamp.split(":"); 
                    if( timeArr.length === 3) { 
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
                            await inputs[0].onFocus(); 
                            let val = (i + 1)*timeInterval; 
                            inputs[0].childNodes[1].value = await genFormattedString(val); 
                            inputs[0].onBlur(); 
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
                            let inputs = await document.querySelectorAll("ytve-formatted-input"); 
                            await inputs[0].onFocus(); 
                            let val = (i + 1)*timeInterval; 
                            inputs[0].childNodes[1].value = await genFormattedString(val); 
                            inputs[0].onBlur(); 
            
                            await sleep(500); 
                            }; 
                        } 
                        await document.querySelector("#save-button").click(); // continue button
                        await sleep(800)
                        await document.querySelector('div#tab-button-container ytcp-button#save').click()
                        let index = await parseInt(localStorage.getItem('index'))
                        //let links = await JSON.parse(await localStorage.getItem('links'))
                        ++index
                        let link = localStorage.getItem(index)
                        await sleep(800)
                        localStorage.setItem('index', index)
                        await sleep(800)
                        console.log('Opening Link: ', link)
                        window.open(link)
                        await sleep(800)
                        open(location, "_self").close(); 
                    }; 
            createTimes(${adbreakConfig.timeInterval});
            ` 
    ) 
}


let skipVideo = async () => {
    return (
        `
        const skipVideo = async (timeInterval) => { 
            function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; 
                    await document.querySelector('div#tab-button-container ytcp-button#save').click()
                    let index = await parseInt(localStorage.getItem('index'))
                    //let links = await JSON.parse(await localStorage.getItem('links'))
                    ++index
                    let link = localStorage.getItem(index)
                    await sleep(500)
                    localStorage.setItem('index', index)
                    await sleep(500)
                    window.open(link)
                    await sleep(500)
                    open(location, "_self").close(); 
                }; 
        skipVideo();
        `  
    )
}



module.exports = {createTimes, skipVideo, updateTimeInterval}