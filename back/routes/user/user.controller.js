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

exports.join = async (req,res)=>{
    console.log(req.body) // req.body 
    const {userid,userpw,userimg,username,nickname,address,gender,phone,mobile,email,userintro} = req.body
    const sql = `INSERT INTO user(
                    userid,
                    userpw,
                    userimg,
                    username,
                    nickname,
                    address,
                    gender,
                    phone,
                    mobile,
                    email,
                    userintro
                ) values(
                    ?,?,?,?,?,?,?,?,?,?,?
                )`
    const prepare = [userid,userpw,userimg,username,nickname,address,gender,phone,mobile,email,userintro]

    try {
        const [result] = await pool.execute(sql,prepare) // 1. SQL:string , 2. prepare:array
        
        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
    
        res.json(response) 
    } catch (e){
        console.log(e)
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: e.errno
        }
        
        res.json(response)  
    }

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
    res.send('회원 정보 업데이트 완료')
}
