//라우터

const express = require('express')
const router = express.Router()
const userRouter = require('./user/index')
const boardRouter = require('./board/index')
const adminRouter = require('./admin/index')
const { Auth } = require('../middlewares/auth.js')
const matchingRouter = require('./matching/index')
const communityRouter = require('./introduce/index')

router.use('/user',userRouter)
router.use('/board', boardRouter)
router.use('/admin',adminRouter)
router.use('/community',communityRouter)
router.use('/matching',matchingRouter)
router.use('/rank', (req,res)=>{
    res.render('etc/this_month.html')
})
router.use('/intro', (req,res)=>{
    res.render('etc/introduce.html')
})
module.exports = router