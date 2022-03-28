const express = require('express')
const router = express.Router()
const axios = require('axios')

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

// QnA

// qna 글쓰기
router.get('/write', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }
    
        res.render('./board/QnA/QnA_write.html', {
            user:user.userid
        })
    }
    catch (e) {
        console.log(e.message)
        res.render('token.html')
    }
})

// qna list
router.get('/', async (req,res) => {
    const response = await axios.get('http://localhost:4000/api/board/QnA/list',option)
    const qna_list = response.data
    res.render('./board/QnA/QnA_list.html', {
        qna_list: qna_list.result
    })
})

//qna view
router.get('/view', async (req, res) => {
    const idx = req.query

    const response = await axios.post('http://localhost:4000/api/board/QnA/view', idx, option)
    const QnA_view = response.data

    res.render('./board/QnA/QnA_view.html', {
        QnA_view : QnA_view.result
    })
})

router.use('/update', async (req, res) => {
    const idx = req.query
    const response = await axios.post('http://localhost:4000/api/board/QnA/view', idx, option)
    const QnA_update = response.data
    console.log(response.data.result)
    res.render('./board/QnA/QnA_update.html', {
        QnA_update:QnA_update.result
    })
})



module.exports = router