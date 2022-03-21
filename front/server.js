//프론트 서버
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router = require('./routes')
app.set('view engine','html')
nunjucks.configure('views',{
  express:app,
})

app.use(express.urlencoded({
    extended:true,
    watch:true
}))

app.get('/', (req,res)=>{
    res.render('main')
})

app.use(router)

app.listen(3000,()=>{
  console.log(`team4 프론트 서버시작!!!, 포트번호 : 3000`)
})