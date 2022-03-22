//프론트 서버
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router = require('./routes')
const webSocket = require('./socket.js')

app.set('view engine','html')
nunjucks.configure('views',{
  express:app,
  watch:true
})

app.use(express.urlencoded({
    extended:true,
}))

app.get('/', (req,res)=>{
    res.render('main', { userid:'userid' })
})


app.use(router)

webSocket(app.listen(3000,()=>{
  console.log(`team4 프론트 서버시작!!!, 포트번호 : 3000`)
}))