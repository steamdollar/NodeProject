//회원관리 컨트롤러
const pool = require('../../db.js').pool
const { createToken } = require('../../utils/jwt.js')


// 지운 이유 교수님이 지우라고했슴.


exports.join = async (req,res)=>{    
    const {userid,userpw,username,nickname,address,gender,phone,mobile,email,userintro} = req.body
    const userimg = req.file.filename

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

    const sql = 'SELECT userid, userimg, username, nickname, address, gender, phone, mobile, email, level from user where userid = ? and userpw = ?'
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

    } catch (e) {
        console.log(e.message)
        const response = {
            result:[],
            errormsg:e.message,
            errno:e.errno
        }
        res.json(response)
    }
}

exports.profile = async (req,res)=>{
    const {userid} = req.user
    
    const sql = 'SELECT userid,username,userimg,nickname,address,gender,phone,mobile,email,userintro from user where userid=?'
    const param = [userid]
    try {
        const [result] = await pool.execute(sql,param)
       
        response = {
            result,
            errno:0
        }
        res.json(response)

    } catch(e){
        console.log(e.message)
        response = {
            
            errno:1
        }
        res.json(response)
    }
    
}


exports.update = async (req,res)=>{
    
    const {userid, userpw,nickname,address,phone,mobile} = req.body
    const userimg = req.file.filename
    const sql ="UPDATE user SET userpw=?, userimg=?, nickname=?, address=?, phone=?, mobile=? WHERE userid=?"
    const param = [userpw,userimg,nickname,address,phone,mobile,userid]
    try{
        const [result] = await pool.execute(sql,param)
        
        const response = {
            result,
            errno:0
        }
        
        res.json(response)

    } catch (e) {
        console.log(e)
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: e.errno
        }
        
        res.json(response)  
    }

}

exports.delete = async (req,res)=>{
    const {userid} = req.user
    const sql = "DELETE FROM user WHERE userid=?"
    const param = [userid]

    try {
        const [result] = await pool.execute(sql,param)
        response = {
            result,
            errno:0
        }
        res.clearCookie('token')

        res.json(response)

    } catch(e){
        console.log(e.message)
        response = {
            
            errno:1
        }
        res.json(response)
    }
}

exports.kakaoLogin = async (req,res)=>{
    const {userid} = req.user

    const sql = 'SELECT userid, userimg, username, nickname, address, gender, phone, mobile, email, level from user where userid = ?'
    const param = [userid]

    try{
        const [result] = await pool.execute(sql,param)
        if( result.length ===0) {throw Error ('id/pw를 확인해주세요')}

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

    } catch(e){
        console.log(e.message)
        const response = {
            result:[],
            errormsg:e.message,
            errno:e.errno
        }
        res.json(response)
    }
}


exports.logout = (req,res) => {
    
    res.clearCookie('token')
    res.clearCookie('kakaoToken')
    res.json({})
}

