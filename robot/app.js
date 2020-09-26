const robot = require("robotjs");
// const clipboardy = require('clipboardy');
const express = require('express')
const app = express()
const port = 3000
const routines = require('./routines')

var tabResetTimeout

app.use(express.static("public"));

app.get('/config', async (req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
})

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

app.get('/robot/createAdbreaks/:tab_count', async (req, res) => {
    routines.createAdbreaks(req.params.tab_count)
    //tabResetTimeout = setTimeout(routines.resetTab, 60000)
    res.status(200).send(true)
})

app.get('/robot/skip', async (req, res) => {
    routines.skipVideo()
    res.status(200).send(true)
})

app.get('/robot/handshake', async (req, res) => {
    console.log('handshake complete: adbreaks running')
    clearTimeout(tabResetTimeout)
    res.status(200).send(true)
})


app.listen(port, () => console.table({ port: `http://localhost:${port}` } ))
 





