//회원관리 컨트롤러
const express = require('express')
const pool = require('../../db.js').pool
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')

const { createToken } = require('../../utils/jwt.js')

app.use(express.json())
app.use(express.urlencoded({express:true}))
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true
}))

exports.join = (req,res)=>{
    res.send('가입완료')
}

exports.login = async (req,res)=>{
    const { userid, userpw } = req.body

    const sql = 'SELECT userid, username, nickname, level from user where userid = ? and userpw = ?'
    const param = [userid, userpw]
    
    try {
        const [result] = await pool.execute(sql, param)

        if( result.length === 0 ) {throw Error ('id/pw를 확인해주세요')}

        const jwt = createToken(result[0])

        res.cookie('token', jwt, {
            path:'/',
            httpOnly:true,
            domain:'localhost'
        })

        const response = {
            result,
            errno:0
        }
        res.json(response)

    }
    catch (e) {
        console.log(e.message)
        const response = {
            result:[],
            errno:1
        }
        res.json(response)
    }
}

exports.update = (req,res)=>{
    res.render('/user/update')
}
