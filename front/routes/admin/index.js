//관리자페이지 미들웨어
const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('./admin/main.html')
})
router.get('/login',(req,res)=>{

    res.render('./admin/login')
})

router.get('/board', (req,res)=>{
    const admin_manage = req.headers.cookie
    if(admin_manage == undefined){ // 그 어떤 쿠키도 없음
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }else{
        const string = admin_manage.toString()
        console.log(admin_manage)
        const cookie = 'connect.sid'
    
        //만약 쿠키에 connect가 포함된 글자가 있다면 접근이 가능하게 하여라. 만약 토큰이 둘다 없으면?
        if(string.includes(cookie)){
            res.render('./admin/board_list')
        } else{
            res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
        }
    }

})

router.get('/user', (req,res)=>{
    const admin_manage = req.headers.cookie
    if(admin_manage == undefined){ // 그 어떤 쿠키도 없음
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }else{
        const string = admin_manage.toString()
        console.log(admin_manage)
        const cookie = 'connect.sid'
    
        //만약 쿠키에 connect가 포함된 글자가 있다면 접근이 가능하게 하여라. 만약 토큰이 둘다 없으면?
        if(string.includes(cookie)){
            res.render('./admin/user_list')
        } else{
            res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
        }
    }

})

router.get('/category', (req,res)=>{
    const admin_manage = req.headers.cookie
    if(admin_manage == undefined){ // 그 어떤 쿠키도 없음
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }else{
        const string = admin_manage.toString()
        console.log(admin_manage)
        const cookie = 'connect.sid'
    
        //만약 쿠키에 connect가 포함된 글자가 있다면 접근이 가능하게 하여라. 만약 토큰이 둘다 없으면?
        if(string.includes(cookie)){
            res.render('./admin/category.html')
        } else{
            res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
        }
    }
})

router.get('/stats', (req,res)=>{
    const admin_manage = req.headers.cookie
    if(admin_manage == undefined){ // 그 어떤 쿠키도 없음
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }else{
        const string = admin_manage.toString()
        console.log(admin_manage)
        const cookie = 'connect.sid'
    
        //만약 쿠키에 connect가 포함된 글자가 있다면 접근이 가능하게 하여라. 만약 토큰이 둘다 없으면?
        if(string.includes(cookie)){
            res.render('./admin/stats')
        } else{
            res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
        }
    }

})

router.get('/notice', (req,res)=>{
    const admin_manage = req.headers.cookie
    if(admin_manage == undefined){ // 그 어떤 쿠키도 없음
        res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
    }else{
        const string = admin_manage.toString()
        console.log(admin_manage)
        const cookie = 'connect.sid'
    
        //만약 쿠키에 connect가 포함된 글자가 있다면 접근이 가능하게 하여라. 만약 토큰이 둘다 없으면?
        if(string.includes(cookie)){
            res.render('./board/notice')
        } else{
            res.send(`<script>alert('관리자 권한이 없습니다. 로그인 페이지로 돌아갑니다.'); location.href='/admin/login';</script>`)
        }
    }

})

router.use('/userupdate', (req,res)=>{

    res.render('./admin/user_update')
})


module.exports = router