//관리자페이지 미들웨어
const express = require('express')
const router = express.Router()

router.use('/login',(req,res)=>{

    res.render('./admin/login')
})

router.use('/board', (req,res)=>{
    const admin_manage = req.headers.cookie.split(';')
    const string = admin_manage.toString()
    console.log(string)
    const cookie = 'connect.sid'

    //만약 쿠키에 connect가 포함된 글자가 있다면 접근이 가능하게 하여라. 만약 토큰이 둘다 없으면?
    if(string.includes(cookie)){
        res.render('./admin/board_list')
    } else{
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)

        
    }
})

router.use('/user', (req,res)=>{
    res.render('./admin/user_list')
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

router.use('/userupdate', (req,res)=>{

    res.render('./admin/user_update')
})


module.exports = router