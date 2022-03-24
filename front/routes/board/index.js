//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser)

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
    const {token} = req.cookies
    const [ header, payload, sign ] = token.split('.')    
    const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
    console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }
    
    res.render('./board/QnA', {
        user:user.userid
    })
})

router.use('/QnA_list', (req,res)=>{
    res.render('./board/QnA_list')
})


router.use('/notice', async (req,res)=>{
    const option = {
        'Content-type':'application/json',
        withCredentials:true
    }
    const response = await axios.get('http://localhost:4000/api/board/notice_list', option)
    const notice_list = response.data
    console.log( notice_list.result) // array [ 객체, 객체 ]
    
    res.render('./board/notice.html', {
        notice_list: notice_list.result
    })
})


router.use('/notice_write', (req,res)=>{
    res.render('./board/notice_write.html')
})


module.exports = router