const express = require('express')
const router = express.Router()
const noticeRouter = require('./noticeController.js')

router.use('/write',noticeRouter.notice_write)
router.use('/list', noticeRouter.notice_list)
router.use('/view', noticeRouter.notice_view)
router.use('/delete', noticeRouter.notice_del)
router.use('/update', noticeRouter.notice_update)

module.exports = router
