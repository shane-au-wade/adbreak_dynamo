// Move the mouse across the screen as a sine wave.
// Type "Hello World" then press enter.
const robot = require("robotjs");
const express = require('express')
const app = express()
const port = 3000

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


app.get('/enter', (req, res) => {

    // sleep(1000).then(() => {
    //     // Type "Hello World".
    //     robot.typeString("Hello World");
        
    //     // Press enter.
    //     robot.keyTap("enter");
    // })
    
    robot.keyTap("enter");
    res.status(200).send(true)
})

app.get('/click', (req, res) => {

    // sleep(1000).then(() => {
    //     // Type "Hello World".
    //     robot.typeString("Hello World");
        
    //     // Press enter.
    //     robot.keyTap("enter");
    // })
    
    robot.mouseClick();
    res.status(200).send(true)
})

app.get('/typevalue/:value', async (req, res) => {

    // sleep(1000).then(() => {
    //     // Type "Hello World".
    //     robot.typeString("Hello World");
        
    //     // Press enter.
    //     robot.keyTap("enter");
    // })
    //console.log(req.params.value)
    let str = await genFormattedString(req.params.value)
    let cpm = 1000;
    console.log(str)
    await robot.mouseClick("left","double");
    await robot.keyTap("backspace")
    await robot.keyTap("backspace")
    await robot.keyTap("backspace")
    await robot.typeStringDelayed( str , cpm)
    await robot.keyTap("enter");
    res.status(200).send(true)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
 
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); };




