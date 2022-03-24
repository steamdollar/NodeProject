const express = require('express')
const router = express.Router()
const modifyController = require('./board.modify.controller')
const writeController = require('./board.write.controller')
const listController = require('./board.list.controller')

const noticeRouter = require('./board_notice/index.js')
const QnARouter = require('./board_qna/index.js')

router.use('/write',writeController.write)
router.use('/modify',modifyController.modify)
router.use('/delete',modifyController.delete)
router.use('/list', listController.list)


router.use('/notice', noticeRouter)
router.use('/QnA', QnARouter)

module.exports = router