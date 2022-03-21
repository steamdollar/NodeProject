//관리자페이지 미들웨어
const express = require('express')
const router = express.Router()
const adminboard = require('./admin_board/index')


router.use('/admin_board',adminboard.board)

router.use('/admin_user', adminboard.user)

router.use('/category', adminboard.category)

router.use('/stats', adminboard.stats)





module.exports = router