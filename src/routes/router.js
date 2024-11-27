const express = require('express')
const { postPredict, getAllData } = require('../controller/controller')

const router = express.Router()


router.post('/', postPredict)
router.get('/histories', getAllData)

module.exports = router