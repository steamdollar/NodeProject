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

// app.post('/api/auth', (req, res) => {
//     try {
//         const {token} = req.cookies
//         console.log(token)
        
//         if (token == undefined) { throw new Error('no token exist')}

//         const [ header, payload, sign ] = token.split('.')
//         const signature = createSignature(header, payload)
        
//         if (sign !== signature ) { throw new Error('invalid token')}
//         const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))

//         req.user = {
//             ...user,
            
//         }
//         res.json(req.user)
//     } 
//     catch (e) {
//         console.log(e.message)
//     }

//     next()
// })

app.listen(4000,()=>{
    console.log(`team4 백 서버시작!!!, 포트번호 : 4000`)
  })