const express = require('express')
const cors = require('cors')
const app = express()
const tf = require('@tensorflow/tfjs-node')
const router = require('./routes/router')
const { loadModel } = require('./services/loadModel')

require('dotenv').config()


const { HOST, PORT } = process.env;

(async () => {
    app.locals.model = await loadModel()
})()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/predict', router)


app.get('/', async (req, res) => {
    if (!app.locals.model) {
        res.send('Gagal')
    }
    res.send('Berhasil')
})

app.listen(PORT, () => {
    console.log(`Running server at ${HOST}:${PORT}`)
})