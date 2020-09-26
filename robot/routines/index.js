const robot = require("robotjs");
const clipboardy = require('clipboardy');
const scriptText = require('./scriptText.js')

const mouseConfig = require("../config/mouseConfig.json")
const keyboardConfig = require("../config/keyboardConfig.json")

console.log(mouseConfig)
console.log(keyboardConfig)
robot.setMouseDelay(mouseConfig.mouseDelay)
robot.setKeyboardDelay(keyboardConfig.keyboardDeplay)


function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };

const createAdbreaks = async (tabs) => {
    console.log("Creating adbreaks")
    //clipboardy.writeSync(`console.log('hello world')`)
    clipboardy.writeSync(scriptText.createTimes)
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
    clipboardy.writeSync(scriptText.skipVideo)
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

module.exports = {createAdbreaks, skipVideo, resetTab}