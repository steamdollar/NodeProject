//프론트 서버
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router =
app.set('view engine','html')
nunjucks.configure('views',{
  express:app,
})

app.use(express.urlencoded({
    extended:true,
    watch:true
}))

router.get('/join', (req,res)=>{
    res.render('./user/join')
})

router.get('/login', (req,res)=>{
    res.render('./user/login')
})

router.get('/update', (req,res)=>{
    res.render('./user/update')
})

router.get('/profile', (req,res)=>{
    res.render('./user/profile')
})

router.get('/update', (req,res)=>{
    res.render('./user/update')
})

router.get('/welcome', (req,res)=>{
    res.render('./user/update')
})

app.listen(3000,()=>{
  console.log(`team4 프론트 서버시작!!!, 포트번호 : 3000`)
})