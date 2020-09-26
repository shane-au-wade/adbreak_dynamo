const express = require('express')
const app = express()
const port = 3000
const routines = require('./routines')
const scriptText = require('./routines/scriptText.js')

app.use(express.static("public"));

app.get('/config', async (req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
})

app.post('/updateAdbreakTimeInterval/:time', async (req, res) => {
    console.log('adbreak Time Interval Updated: ', req.params.time)
    scriptText.updateTimeInterval(req.params.time)
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
 





