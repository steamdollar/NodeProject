//라우터
const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')

//user
router.post('/api/user',userRouter)


//board
router.post('/api/board',boardRouter)


//admin
router.post('/api/admin', adminRouter)

module.exports = router