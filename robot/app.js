require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

// express routes imports 
const configRouter = require('./routes/config');
const notifyRouter = require('./routes/notify')
const robotRouter = require('./routes/robot')

// static folder serving
app.use(express.static("public"));

// global base dir name setup for routes 
global.__basedir = __dirname;

// routes
app.use('/config', configRouter);
app.use('/notify', notifyRouter);
app.use('/robot', robotRouter)

app.listen(port, () => console.table({ port: `http://localhost:${port}` } ))
 





