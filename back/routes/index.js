//라우터
const express = require('express')
const router = express.Router()
const app = express()

const userRouter = require('./user/index')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')


//user
router.use('/api/user',userRouter)


//board
router.use('/api/board',boardRouter)


//admin
router.use('/api/admin', adminRouter)



module.exports = router