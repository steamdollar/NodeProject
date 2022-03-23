//백서버
const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { Auth } = require('./middlewares/auth.js')


app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(cors({
    origin:true,
    credentials:true,
}))
app.use(cookieParser())


app.use(Auth)
app.use(router)

app.listen(4000,()=>{
    console.log(`team4 백 서버시작!!!, 포트번호 : 4000`)
  })