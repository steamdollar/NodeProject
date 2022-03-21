//회원관리 미들웨어

const express = require('express')
const router = express.Router()

router.get('/join', (req,res)=>{
    res.render('./user/join')
})

router.get('/login', (req,res)=>{
    res.render('./user/login')
})

router.get('/update', (req,res)=>{
    res.render('./user/update')
})

router.get('/profile', (req,res)=>{
    res.render('./user/profile')
})

router.get('/update', (req,res)=>{
    res.render('./user/update')
})

router.get('/welcome', (req,res)=>{
    res.render('./user/update')
})

module.exports = router