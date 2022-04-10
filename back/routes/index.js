//라우터
const express = require('express')
const router = express.Router()
const app = express()

const userRouter = require('./user/index')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')
const matchingRouter = require('./matching/index')
const rankRouter = require('./etc/this_month/index')
const mainRouter = require('./main/index')
router.use('/api', mainRouter)
//user
router.use('/api/user',userRouter)


//board
router.use('/api/board',boardRouter)


//admin
router.use('/api/admin', adminRouter)

//matchhing
router.use('/api/matching', matchingRouter)
router.use('/api/rank',rankRouter)


module.exports = router