//관리자페이지 미들웨어
const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }

        res.render('./admin/main.html',)
    }
    catch (e) {
        console.log(e.message)
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }
})
router.get('/login',(req,res)=>{

    res.render('./admin/login')
})


router.get('/board', (req,res)=>{

    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }

        res.render('./admin/board_list.html',)
    }
    catch (e) {
        console.log(e.message)
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }

})

router.get('/user', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }

        res.render('./admin/user_list.html',)
    }
    catch (e) {
        console.log(e.message)
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }

})

router.get('/category', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }

        res.render('./admin/category.html',)
    }
    catch (e) {
        console.log(e.message)
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }
})

router.get('/stats', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }

        res.render('./admin/stats.html',)
    }
    catch (e) {
        console.log(e.message)
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }

})

router.get('/notice', (req,res)=>{
    const {token} = req.cookies
    try {
        if (token === undefined) {throw new Error('token이 존재하지 않습니다.')}
        const [ header, payload, sign ] = token.split('.')    
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        console.log(user) // { userid: 'sila', username: 'qwerty', nickname: 'qwerty', level: 1 }

        res.render('./admin/notice.html',)
    }
    catch (e) {
        console.log(e.message)
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }

})

router.use('/userupdate', (req,res)=>{

    res.render('./admin/user_update')
})


module.exports = router