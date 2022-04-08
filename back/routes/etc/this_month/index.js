const express = require('express')
const router = express.Router()
const rankController = require('./this_month.controller')
router.post('/', rankController.rank)


module.exports = router