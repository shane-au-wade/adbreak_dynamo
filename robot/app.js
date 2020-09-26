const robot = require("robotjs");
const clipboardy = require('clipboardy');
const express = require('express')
const app = express()
const port = 3000

var tabResetTimeout

const mouseConfig = require("./config/mouseConfig.json")
const keyboardConfig = require("./config/keyboardConfig.json")
console.log(mouseConfig)
console.log(keyboardConfig)
robot.setMouseDelay(mouseConfig.mouseDelay)
robot.setKeyboardDelay(keyboardConfig.keyboardDeplay)

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

app.get('/typevalue/:value', async (req, res) => {

    let str = await genFormattedString(req.params.value)
    let cpm = 1000;
    console.log(str)
    robot.mouseClick("left","double");
    robot.keyTap("backspace")
    robot.keyTap("backspace")
    robot.keyTap("backspace")
    robot.typeStringDelayed( str , cpm)
    robot.keyTap("enter");
    res.status(200).send(true)
})

const createAdbreaks = async (tabs) => {
    console.log("Creating adbreaks")
    //clipboardy.writeSync(`console.log('hello world')`)
    clipboardy.writeSync(
    `
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

            let url = 'http://localhost:3000/robot/handshake'
            fetch(url, {
                mode: 'no-cors', // no-cors, *cors, same-origin
            });

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
    createTimes(4);
    `  
    )
    await sleep(500)
    robot.moveMouse(mouseConfig.tabLocation.x, mouseConfig.tabLocation.y);
    robot.mouseClick()
    await sleep(500)
    for(let i = 0; i < tabs; ++i) {
            robot.keyTap('tab', 'control')
            await sleep(500)
            robot.keyTap('f12')
            await sleep(2500)
            robot.moveMouse(mouseConfig.consoleLocation.x, mouseConfig.consoleLocation.y);
            robot.mouseClick()
            robot.keyTap('v', ['control','shift'])
            await sleep(500)
            robot.keyTap('enter')
            await sleep(1000)
    }
}

const skipVideo = async () => {
    console.log("Skipping bad video")
    //clipboardy.writeSync(`console.log('hello world')`)
    clipboardy.writeSync(
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
    await sleep(500)
    robot.moveMouse(mouseConfig.tabLocation.x, mouseConfig.tabLocation.y);
    robot.mouseClick()
    await sleep(500)
    robot.keyTap('tab', 'control')
    await sleep(500)
    robot.keyTap('f12')
    await sleep(1000)
    robot.moveMouse(mouseConfig.consoleLocation.x, mouseConfig.consoleLocation.y);
    robot.mouseClick()
    robot.keyTap('v', ['control','shift'])
    await sleep(500)
    robot.keyTap('enter')
    await sleep(1000)
}

const resetTab = async () => {
    console.log('Reseting tab: handshake incomplete')
    await sleep(500)
    robot.moveMouse(mouseConfig.tabLocation.x, mouseConfig.tabLocation.y);
    robot.mouseClick()
    await sleep(500)
    robot.keyTap('tab', 'control')
    await sleep(500)
    robot.keyTap('f12') // close the dev tools that were likely opened by the previous script
    await sleep(500)
    robot.keyTap('f5')
}

app.get('/robot/createAdbreaks/:tab_count', async (req, res) => {
    createAdbreaks(req.params.tab_count)
    tabResetTimeout = setTimeout(resetTab, 60000)
    res.status(200).send(true)
})

app.get('/robot/skip', async (req, res) => {
    skipVideo()
    res.status(200).send(true)
})

app.get('/robot/handshake', async (req, res) => {
    console.log('handshake complete: adbreaks running')
    clearTimeout(tabResetTimeout)
    res.status(200).send(true)
})


app.listen(port, () => console.table({ port: `http://localhost:${port}` } ))
 





