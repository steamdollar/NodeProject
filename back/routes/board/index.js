const express = require('express')
const router = express.Router()
const modifyController = require('./board.modify.controller')
const noticeController = require('./board.notice.controller')
const QnAController = require('./board.QnA.controller')
const writeController = require('./board.write.controller')

router.post('/write',writeController.write)
router.post('/modify',modifyController.modify)
router.post('/QnA',QnAController.QnA)
router.post('/delete',modifyController.delete)
router.post('/notice',noticeController.notice)

module.exports = router