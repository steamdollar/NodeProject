const express = require('express')
const router = express.Router()
const mainController = require('./main.controller')

router.post('/hotboard', mainController.hotboard)

router.post('/hotstudent1', mainController.hotstudent1)
router.post('/hotstudent2', mainController.hotstudent2)


module.exports = router