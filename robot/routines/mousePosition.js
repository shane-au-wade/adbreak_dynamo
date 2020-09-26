const robot = require("robotjs");
const mouseConfig = require("../config/mouseConfig.json")
const keyboardConfig = require("../config/keyboardConfig.json")
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


//"https://studio.youtube.com/video/Yo2OAhI8XO4/monetization/ads", "https://studio.youtube.com/video/fXuavwh6reY/monetization/ads", "https://studio.youtube.com/video/KYzzAMj7SVk/monetization/ads", "https://studio.youtube.com/video/A9Y4sYn86jU/monetization/ads", "https://studio.youtube.com/video/5piD3p6-73A/monetization/ads", "https://studio.youtube.com/video/PRC3TaJstnM/monetization/ads", "https://studio.youtube.com/video/HVulpZi6HV4/monetization/ads", "https://studio.youtube.com/video/9X_jHSH5yQY/monetization/ads", "https://studio.youtube.com/video/xtMX2tVlK_U/monetization/ads", "https://studio.youtube.com/video/P8KOak1sH1c/monetization/ads", "https://studio.youtube.com/video/_eRGIbvuqH4/monetization/ads", "https://studio.youtube.com/video/JCz9ivK5GEM/monetization/ads", "https://studio.youtube.com/video/1pV0ixJ22LQ/monetization/ads", "https://studio.youtube.com/video/BAwEB3J-jNw/monetization/ads", "https://studio.youtube.com/video/AWvPkXEKNoI/monetization/ads", "https://studio.youtube.com/video/JWicUNswEO4/monetization/ads"