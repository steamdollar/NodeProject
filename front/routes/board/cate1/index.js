const express = require('express')
const router = express.Router()
const axios = require('axios')

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

router.get('/', async (req, res) => {
    const response = await axios.get('http://localhost:4000/api/board/cate1/list', option)
    const cate1_list = response.data

    res.render('./board/cate1/cate1_list.html', {
        cate1_list:cate1_list.result
    })
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

router.get('/view', async (req, res) => {
    const idx = req.query
    const { token } = req.cookies
    const [ header , payload, sign ] = token.split('.')
    const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
    
    const response = await axios.post('http://localhost:4000/api/board/cate1/view', idx, option)
    const cate1_view = response.data

    res.render('./board/cate1/cate1_view.html', {
        cate1_view : cate1_view.result,
        userid:user.userid
    })
})

router.get('/update', async (req, res) => {
    const idx = req.query
    const response = await axios.post('http://localhost:4000/api/board/cate1/view', idx, option)
    const cate1_update = response.data

    res.render('./board/cate1/cate1_update.html', {
        cate1_update:cate1_update.result
    })
})

module.exports = router