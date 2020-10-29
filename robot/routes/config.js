/**
 * Config routes are intended to configure serverside automation 
 * parameters.
 * These parameters affect automation routines which can be found
 * in the ../routines folder
 * You can checkout what parameters can be set specifically at
 * localhost:3000/config
 */

const express = require('express');
const router = express.Router();
const routines = require('../routines')
const scriptText = require('../routines/scriptText.js')

router.get('/', async (req, res) => {
    res.status(200).sendFile(__basedir + '/public/index.html');
})

router.post('/updateAdbreakTimeInterval/:time', async (req, res) => {
    console.log('adbreak Time Interval Updated: ', req.params.time)
    scriptText.updateTimeInterval(req.params.time)
    res.status(200).send('ok');
})

router.get('/getAdbreakTimeInterval', async (req, res) => {
    let time = await scriptText.getTimeInterval()
    //console.log('retreiving time interval: ', time)
    res.set('interval', time.toString())
    res.status(200).send('ok');
})

router.get('/getAdbreakScriptText', async (req, res) => {
    routines.copyCreateTimes()
    res.status(200).send('ok');
})

module.exports = router;