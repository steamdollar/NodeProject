const express = require('express')
const router = express.Router()
const noticeRouter = require('./board_notice/index.js')
const QnARouter = require('./board_qna/index.js')
const cate1Router = require('./cate1/index.js')

router.use('/notice', noticeRouter)
router.use('/QnA', QnARouter)
router.use('/cate1', cate1Router)

module.exports = router