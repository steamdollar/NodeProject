//관리자페이지 컨트롤러(회원관리, 게시물관리, 카테고리, 통계)

const pool = require('../../db.js').pool
const { createToken } = require('../../utils/jwt.js')
const { login } = require('../user/user.controller.js')

exports.login = (req,res)=>{
    console.log(req.body)
    const {adminid, adminpw} = req.body
    const login_flag = (adminid === "admin" && adminpw === "admin")
    console.log(login_flag)

    try{
        if(login_flag === false){
            throw new Error('관리자 권한이 없습니다.')
        }
        const response = {
            result:"success"
        }
        res.json(response)
    }catch(e){
        console.log(e)
        const response = {
            result:"failure"
        }
        res.json(response)
    }
}

exports.userList = async (req,res)=>{
    //유저 리스트
    const sql = 'SELECT * from user'
    try {
        const [result] = await pool.execute(sql)
       
        const response = {
            result
        }
        res.json(response)

    } catch(e){
        console.log(e.message)
        const response = {
            error:"Not access"
        }
        res.json(response)
    }


}

exports.userSearch = async (req,res)=>{
    //유저 검색
    const sql = `select * from user where nickname = ?`
    
    const nickname = req.body
    console.log(nickname)
    const prepare = [nickname]
    try {
        const [result] = await pool.execute(sql,prepare)
       
        const response = {
            result
        }
        res.json(response)

    } catch(e){
        console.log(e.message)
        const response = {
            error:"Not access"
        }
        res.json(response)
    }
    
}

exports.userUpdate = (req,res)=>{
    res.send('관리자 권한 회원 정보 강제 수정')
}

exports.userDelete = (req,res)=>{
    res.send('관리자 권한 회원 강제퇴장')
}

exports.boardSearch = (req,res)=>{
    res.send('게시물 검색')
}

exports.boardHidden = (req,res)=>{
    res.send('회원 게시물 내림')
}

