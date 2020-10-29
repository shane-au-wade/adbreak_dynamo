/**
 * Robot routes are intended to execute autmation routines
 * routines are confiuged in Config routes and then executed 
 * by Robot routes
 */

const express = require('express');
const router = express.Router();
const routines = require('../routines')

router.get('/createAdbreaks/:tab_count', async (req, res) => {
    routines.createAdbreaks(req.params.tab_count)
    res.status(200).send(true)
})

router.get('/skip', async (req, res) => {
    routines.skipVideo()
    res.status(200).send(true)
})

module.exports = router;