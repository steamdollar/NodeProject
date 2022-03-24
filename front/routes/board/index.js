//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cookieParser = require('cookie-parser')

const app = express()

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

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

// QnA

// qna 글쓰기
router.use('/QnA_write', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }
    
        res.render('./board/QnA/QnA.html', {
            user:user.userid
        })
    }
    catch (e) {
        console.log(e.message)
        res.render('token.html')
    }
})

// qna list
router.use('/QnA', async (req,res) => {
    const response = await axios.get('http://localhost:4000/api/board/qna_list',option)
    const qna_list = response.data
    res.render('./board/QnA/QnA_list.html', {
        qna_list: qna_list.result
    })
})

//qna view
router.use('/QnA_view', async (req, res) => {
    const idx = req.query

    const response = await axios.post('http://localhost:4000/api/board/QnA_view', idx, option)
    const QnA_view = response.data

    res.render('./board/QnA/QnA_view.html', {
        QnA_view : QnA_view.result
    })
})



// 공지

// 리스트
router.use('/notice', async (req,res)=>{
    const response = await axios.get('http://localhost:4000/api/board/notice_list', option)
    const notice_list = response.data
    // console.log( notice_list.result) // array [ 객체, 객체 ]
    
    res.render('./board/notice/notice.html', {
        notice_list: notice_list.result
    })
})

// 공지 - 글쓰기
router.use('/notice_write', (req,res)=>{
    res.render('./board/notice/notice_write.html')
})

// 공지 - 글 보기
router.use('/notice_view', async (req, res) => {
    const idx = req.query //json

    const response = await axios.post('http://localhost:4000/api/board/notice_view', idx, option)
    const notice_view = response.data

    res.render('./board/notice/notice_view.html', {
        notice_view: notice_view.result
    })
})


module.exports = router