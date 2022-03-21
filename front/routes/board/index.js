//회원관리 미들웨어
const express = require('express')
const router = express.Router()


router.use('/list',(req,res)=>{
    res.render('./board/list')
})

router.use('/modify',  (req,res)=>{
    res.render('./board/modify')
})

router.use('/view', (req,res)=>{
    res.render('./board/view')
})

router.use('/write', (req,res)=>{
    res.render('./board/write')
})

router.use('/QnA', (req,res)=>{
    res.render('./board/QnA')
})



module.exports = router