//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cookieParser = require('cookie-parser')
const cate1Router = require('./cate1/index.js')
const QnARouter = require('./QnA/QnA_index.js')
const noticeRouter = require('./notice/index.js')

const app = express()

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

app.use(cookieParser)

router.get('/', (req, res) => {
    res.render('./board/board_main.html')
})

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

// cate1
router.use('/cate1', cate1Router)

// QnA
router.use('/QnA', QnARouter)

// notice
router.use('/notice', noticeRouter)


module.exports = router