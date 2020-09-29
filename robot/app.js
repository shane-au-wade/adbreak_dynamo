require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routines = require('./routines')
const scriptText = require('./routines/scriptText.js')
const telegram = require('./telegram')

app.use(express.static("public"));

app.get('/config', async (req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
})

app.post('/updateAdbreakTimeInterval/:time', async (req, res) => {
    console.log('adbreak Time Interval Updated: ', req.params.time)
    scriptText.updateTimeInterval(req.params.time)
    res.status(200).send('ok');
})

app.get('/getAdbreakTimeInterval', async (req, res) => {
    let time = await scriptText.getTimeInterval()
    //console.log('retreiving time interval: ', time)
    res.set('interval', time.toString())
    res.status(200).send('ok');
})

app.get('/getAdbreakScriptText', async (req, res) => {
    routines.copyCreateTimes()
    res.status(200).send('ok');
})

app.post('/notify/start/:channel/:shortVideos/:longVideos', async (req, res) => {
    console.log(`channel: ${req.params.channel} | shortVideos: ${req.params.shortVideos} longVideos: ${req.params.longVideos}`)
    telegram.sendStartMessage(req.params)
    res.status(200).send('ok');
})

app.post('/notify/short-end/:channel/:index', async (req, res) => {
    console.log(`channel: ${req.params.channel} | short videos completed: ${req.params.index}`)
    telegram.sendEndShortMessage(req.params)
    res.status(200).send('ok');
})

app.post('/notify/long-end/:channel/:index', async (req, res) => {
    console.log(`channel: ${req.params.channel} | long videos completed: ${req.params.index}`)
    telegram.sendEndLongMessage(req.params)
    res.status(200).send('ok');
})

app.get('/robot/createAdbreaks/:tab_count', async (req, res) => {
    routines.createAdbreaks(req.params.tab_count)
    res.status(200).send(true)
})

app.get('/robot/skip', async (req, res) => {
    routines.skipVideo()
    res.status(200).send(true)
})

app.listen(port, () => console.table({ port: `http://localhost:${port}` } ))
 





