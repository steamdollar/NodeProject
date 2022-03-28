const express = require('express')
const router = express.Router()
const axios = require('axios')

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

// notice

router.get('/', async (req,res)=>{
    const response = await axios.get('http://localhost:4000/api/board/notice/list', option)
    const notice_list = response.data
    // console.log( notice_list.result) // array [ 객체, 객체 ]
    
    res.render('./board/notice/notice_list.html', {
        notice_list: notice_list.result
    })
})

// 공지 - 글쓰기
router.get('/write', (req,res)=>{
    res.render('./board/notice/notice_write.html')
})

// 공지 - 글 보기
router.get('/view', async (req, res) => {
    const idx = req.query //json

    const response = await axios.post('http://localhost:4000/api/board/notice/view', idx, option)
    const notice_view = response.data
    res.render('./board/notice/notice_view.html', {
        notice_view: notice_view.result
    })
})

// 공지 - 글 수정
router.get('/update', async (req, res) => {
    const idx = req.query
    
    const response = await axios.post('http://localhost:4000/api/board/notice/view', idx, option)
    const notice_update = response.data
    res.render('./board/notice/notice_update.html', {
        notice_update:notice_update.result
    })
})

module.exports = router