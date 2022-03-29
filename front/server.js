//프론트 서버
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const router = require('./routes')
const webSocket = require('./socket.js')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const multer = require('multer')
const path = require('path')
const { Auth } = require('./middlewares/auth')
let cookieShuttle = {}

const upload = multer({
  storage:multer.diskStorage({
      destination:(req, file, done) => {
          done(null, 'uploads')
      },
      filename:(req, file, done) => {
          const ext = path.extname(file.originalname)
          const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext
          done(null, filename)
      }
  }),
  limits: { fileSize : 5 * 1024 * 1024 }
})

app.set('view engine','html')
nunjucks.configure('views', {
  express:app,
  watch:true
})

app.use(cookieParser())


app.use(express.urlencoded({
    extended:true,
}))

app.get('/', (req,res)=>{
  const {token} = req.cookies
  if(token !== undefined) {
    const userid = token.split('.')
    const deUserid = JSON.parse(Buffer.from(userid[1], 'base64').toString('utf-8'))
    cookieShuttle = { ...deUserid }

    res.render('main', {
      userid: cookieShuttle.userid
    })
  } else {
        res.render('main2')
  }
})


app.use(router)

webSocket(app.listen(3000,()=>{
  console.log(`team4 프론트 서버시작!!!, 포트번호 : 3000`)
}))
