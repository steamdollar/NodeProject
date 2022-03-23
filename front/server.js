//프론트 서버
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router = require('./routes')
const webSocket = require('./socket.js')
const cookieParser = require('cookie-parser')


let cookieShuttle = {}

app.set('view engine','html')
nunjucks.configure('views',{
  express:app,
  watch:true
})

app.use(cookieParser())
app.use(express.urlencoded({
    extended:true,
}))

app.get('/', (req,res)=>{
  const {token} = req.cookies
  console.log(req.cookies)
  if(token !== undefined) {
    const userid = token.split('.')
    const deUserid = JSON.parse(Buffer.from(userid[1], 'base64').toString('utf-8'))
    cookieShuttle = { ...deUserid }

    res.render('main', {
      userid: cookieShuttle.userid
    })
  }
  else {
    res.render('main2')
  }
})


app.use(router)

webSocket(app.listen(3000,()=>{
  console.log(`team4 프론트 서버시작!!!, 포트번호 : 3000`)
}))
