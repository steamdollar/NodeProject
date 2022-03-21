//백서버

const express = require('express')
const app = express()
const router = require('./routes')

app.use('/', (req,res)=>{
    res.render('main')
})
app.use(router)

app.listen(4000,()=>{
    console.log(`team4 백 서버시작!!!, 포트번호 : 4000`)
  })