const express = require('express')
const router = express.Router()
const userboard = require('./user_board/index')



router.use('/list',userboard.list)

router.use('/modify', userboard.modify)

router.use('/notice', userboard.notice)

router.use('/QnA', userboard.QnA)

router.use('/view', userboard.view)

router.use('/write', userboard.write)




module.exports = router