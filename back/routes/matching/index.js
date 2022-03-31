const express = require('express')
const router = express.Router()
const matchingController = require('./matching.controller')
const axios = require('axios')
router.post('/duo', matchingController.duoRegister)
router.post('/duosearch', matchingController.duoSearch)

router.post('/meeting', matchingController.meeting)

router.post('/mento', matchingController.mento)

module.exports = router