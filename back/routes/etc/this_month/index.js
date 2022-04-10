const express = require('express')
const router = express.Router()
const rankController = require('./this_month.controller')
router.post('/first', rankController.rank1)
router.post('/second', rankController.rank2)

module.exports = router