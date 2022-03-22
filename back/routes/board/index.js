const express = require('express')
const router = express.Router()
const boardController= require('./board.controller')

router.post('/write',boardController.write)
router.post('/modify',boardController.modify)
router.post('/QnA',boardController.QnA)
router.post('/delete',boardController.delete)
router.post('/notice',boardController.notice)

module.exports = router