//관리자페이지 컨트롤러(회원관리, 게시물관리, 카테고리, 통계)

const pool = require('../../db.js').pool
const { createToken } = require('../../utils/jwt.js')
const { login } = require('../user/user.controller.js')

exports.loginControl = (req,res)=>{
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
exports.userControl = async (req,res)=>{
    //유저 검색
    console.log(req.body)
    
    res.send('회원 관리 완료')
}

exports.boardControl = (req,res)=>{
    res.send('게시물 관리 완료')
}

exports.search = (req,res)=>{
    res.send('회원이 쓴 게시물 검색 완료')
}
exports.boardControl.hidden = (req,res)=>{
    res.send('회원 게시물 내림')
}

exports.userControl.modify = (req,res)=>{
    res.send('관리자 권한 회원 정보 강제 수정')
}