const express = require('express')
const router = express.Router()
const axios = require('axios')
// const { pool } = require('../../../../back/db')

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

router.get('/', async (req, res) => {
    res.render('./board/cate1/cate1_list.html')
})

router.get('/write', (req, res) => {
    const {token} = req.cookies
        try {
            if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
            const [ header, payload, sign ] = token.split('.')    
            const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
            // console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }
            
            res.render('./board/cate1/cate1_write.html', {
                userid:user.userid,
                nickname:user.nickname
            })
        }
        catch (e) {
            console.log(e.message)
            res.render('token.html')
        }
})

const check = async (req, res, next) => {
    const idx = req.query
    const response = await axios.post('http://localhost:4000/api/board/cate1/check', idx, option)
    if (response.data.hidden === 'on') { res.render('./board/cate1/cate1_blind.html') }
    else {
        next()
    }
}

router.get('/view', check, async (req, res) => {
    const idx = req.query

    const { token } = req.cookies
    const [ header , payload, sign ] = token.split('.')
    const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
    
    const response = await axios.post('http://localhost:4000/api/board/cate1/view', idx, option)
    const cate1_view = response.data

    const response2 = await axios.post('http://localhost:4000/api/board/cate1/hashtagLoad', idx, option)
    const cate1_hashtag = response2.data

    const response3 = await axios.post('http://localhost:4000/api/board/cate1/imgLoad', idx, option)
    const cate1_image = response3.data.result1[0]



    res.render('./board/cate1/cate1_view.html', {
        cate1_view: cate1_view.result[0],
        userid:user.userid,
        nickname:user.nickname,
        cate1_hashtag:cate1_hashtag.result_final,
        cate1_image:cate1_image
    })
})


router.get('/update', async (req, res) => {
    const idx = req.query
    const response = await axios.post('http://localhost:4000/api/board/cate1/view', idx, option)
    const cate1_update = response.data

    const response2 = await axios.post('http://localhost:4000/api/board/cate1/hashtagLoad', idx, option)
    const cate1_hashtag = response2.data
    
    res.render('./board/cate1/cate1_update.html', {
        cate1_update:cate1_update.result[0],
        cate1_hashtag:cate1_hashtag.result_final
    })
})

router.get('/search', async (req, res )=> {
    const {option, keyword} = req.query
    res.render('./board/cate1/search.html', {
        option,
        keyword
    })
})

module.exports = router