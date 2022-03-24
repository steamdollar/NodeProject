const express = require('express')
const router = express.Router()
const qnaRouter = require('./QnA_Controller.js')

router.use('/write',qnaRouter.QnA_write)
router.use('/list', qnaRouter.QnA_list)
router.use('/view', qnaRouter.QnA_view)
router.use('/delete', qnaRouter.QnA_del)

module.exports = router
