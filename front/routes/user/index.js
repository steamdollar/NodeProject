//회원관리 미들웨어
const express = require('express')
const router = express.Router()

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
    const {user} = req.session
    res.render('./user/profile',{
        user
    })
})

router.use('/welcome', (req,res)=>{
    res.render('./user/welcome')
})

module.exports = router