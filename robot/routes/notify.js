/**
 * Notify routes are intended to share data from within the server
 * to outsite systems
 * Currently we Notify Telegram and Google Sheets 
 */

const express = require('express');
const router = express.Router();
const telegram = require('../telegram')

router.post('/start/:channel/:shortVideos/:longVideos', async (req, res) => {
    console.log(`channel: ${req.params.channel} | shortVideos: ${req.params.shortVideos} longVideos: ${req.params.longVideos}`)
    telegram.sendStartMessage(req.params)
    res.status(200).send('ok');
})

router.post('/short-end/:channel/:index', async (req, res) => {
    console.log(`channel: ${req.params.channel} | short videos completed: ${req.params.index}`)
    telegram.sendEndShortMessage(req.params)
    res.status(200).send('ok');
})

router.post('/long-end/:channel/:index', async (req, res) => {
    console.log(`channel: ${req.params.channel} | long videos completed: ${req.params.index}`)
    telegram.sendEndLongMessage(req.params)
    res.status(200).send('ok');
})

module.exports = router;