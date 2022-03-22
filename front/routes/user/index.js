//회원관리 미들웨어
const express = require('express')
const router = express.Router()

let cookieShuttle = {}

router.use('/join',(req,res)=>{
    res.render('./user/join')
})

router.use('/login', (req,res)=>{
    res.render('./user/login')
})

router.use('/update', (req,res)=>{
    res.render('./user/update')
})

router.use('/profile', (req,res)=>{
    res.render('./user/profile')
})

router.use('/welcome', (req,res)=>{
    res.render('./user/welcome')
})

module.exports = router