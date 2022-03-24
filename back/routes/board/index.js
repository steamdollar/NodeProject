const express = require('express')
const router = express.Router()
const modifyController = require('./board.modify.controller')
const noticeController = require('./board_notice/board.notice.controller')
const notice_listController = require('./board_notice/board.notice_list.controller.js')
const QnAController = require('./board_qna/board.QnA.controller')
const writeController = require('./board.write.controller')
const listController = require('./board.list.controller')


router.use('/write',writeController.write)
router.use('/modify',modifyController.modify)
router.use('/QnA',QnAController.QnA)
router.use('/delete',modifyController.delete)
router.use('/notice',noticeController.notice)
router.use('/list', listController.list)
router.use('/notice_list', notice_listController.notice_list)

module.exports = router