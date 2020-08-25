const robot = require("robotjs");
const mouseConfig = require("./config/mouseConfig.json")
const keyboardConfig = require("./config/keyboardConfig.json")
console.log(mouseConfig)
console.log(keyboardConfig)
robot.setMouseDelay(mouseConfig.mouseDelay)
robot.setKeyboardDelay(keyboardConfig.keyboardDeplay)

let counter = 0
while(true){
    if(counter%10000 == 0) {
        var mouse = robot.getMousePos();
        console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    }
    counter++
}

//function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };
// setTimeout( async function()
// {
//     // path to top right 
//     robot.moveMouse(1296, 15);
//     robot.mouseClick()
//     robot.keyTap('tab', 'control')
//     await sleep(500)
//     robot.keyTap('f12')
//     await sleep(1000)
//     robot.moveMouse(mouseConfig.x, mouseConfig.y);
//     robot.mouseClick()
//     robot.keyTap('v', 'control')
//     await sleep(500)
//     robot.keyTap('enter')
// }, 5000);
