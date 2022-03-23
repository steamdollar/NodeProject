//회원관리 미들웨어
const express = require('express')
const router = express.Router()
let update = {}

router.use('/join',(req,res)=>{
    res.render('./user/join')
})

router.use('/login', (req,res)=>{
    res.render('./user/login')
})

router.use('/update', (req,res)=>{
    
    const {token} = req.cookies
    
    if(token !== undefined) {
    const userid = token.split('.')
    const deUserid = JSON.parse(Buffer.from(userid[1], 'base64').toString('utf-8'))
    console.log(deUserid)
    update = { ...deUserid }
    console.log(update)
    

    res.render('./user/update',{
        user:update
    })
  } else {
      console.log('안됨')
  }
   
})

router.use('/profile', (req,res)=>{
    res.render('./user/profile')
})

router.use('/welcome', (req,res)=>{
    res.render('./user/welcome')
})

module.exports = router