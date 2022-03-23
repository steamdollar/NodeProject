//관리자페이지 미들웨어
const express = require('express')
const router = express.Router()

router.use('/login',(req,res)=>{
    res.render('./admin/admin_login')
})

router.use('/board', (req,res)=>{
    res.render('./admin/admin_board')
})

router.use('/user', (req,res)=>{
    res.render('./admin/admin_user')
})

router.use('/category', (req,res)=>{
    res.render('./admin/category')
})

router.use('/stats', (req,res)=>{
    res.render('./admin/stats')
})

router.use('/notice', (req,res)=>{
    res.render('./board/notice')
})



module.exports = router