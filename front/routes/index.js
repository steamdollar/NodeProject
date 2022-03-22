//라우터

const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')


router.use('/user',userRouter)
router.use('/board',boardRouter)
router.use('/admin',adminRouter)

module.exports = router