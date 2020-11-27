/**
 * Robot routes are intended to execute autmation routines
 * routines are confiuged in Config routes and then executed 
 * by Robot routes
 */
const express = require('express');
const router = express.Router();
const routines = require('../routines')
const watchdog =  require('../watchdog')

router.post('/startTimer/:time', async (req, res) => {
    //console.log('/watchdog/startTimer | time: ', req.params.time)
    watchdog.startTimer(parseInt(req.params.time), routines.refreshTab)
    res.status(200).send("ok")
})

router.post('/updateTimer/:time', async (req, res) => {
    //console.log('/watchdog/updateTimer')
    watchdog.updateTimer(parseInt(req.params.time), routines.refreshTab)
    res.status(200).send('ok')
})

router.post('/clearTimer', async (req, res) => {
    //console.log('/watchdog/clearTimer')
    await watchdog.clearTimer()
    res.status(200).send('ok')
})

module.exports = router;