//관리자페이지 컨트롤러(회원관리, 게시물관리, 카테고리, 통계)

const pool = require('../../db.js').pool
const { response } = require('express')
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
        console.log(response.result)
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
    const {nickname} = req.body
    const sql = `select * from user where nickname LIKE "%${nickname}%"`

    try {
        const [result] = await pool.execute(sql)

        const response = {
            result,
            errno:"none"
        }
        console.log(response.result)
        res.json(response)

    } catch(e){
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: e.errno
        }
        res.json(response)
    }
    
}

exports.userUpdate = async (req,res)=>{
    const body = req.body
    console.log(body.beforeData.level)
    let modified_userid = []
    let modified_userlevel = []
    let modified_nickname = []
    const before = body.beforeData
    const current = body.currentData
    const search_before = body.search_beforeData
    console.log("리스트 이전데이터" ,before.userid.length, "현재데이터",current.userid.length, "검색후수정전데이터",search_before.userid.length)
    if(current.userid.length == before.userid.length){ //유저리스트페이지에서(검색x)
        for(let i=0; i<current.userid.length; i++){
            if(before.level[i]!== current.level[i] || before.nickname[i]!==current.nickname[i]){
                modified_userid.push(current.userid[i])
                modified_userlevel.push(current.level[i])
                modified_nickname.push(current.nickname[i])
    
            }
        }
        
    }
    else if(search_before.userid.length == current.userid.length){ //유저검색페이지에서(검색o)
        for(let i=0; i<current.userid.length; i++){
            if(search_before.level[i]!== current.level[i] || before.nickname[i]!==current.nickname[i]){
                modified_userid.push(current.userid[i])
                modified_userlevel.push(current.level[i])
                modified_nickname.push(current.nickname[i])
            }
        }
    }
    console.log("변경사항", modified_userid, modified_userlevel, modified_nickname)




    const level_querylist = []
    const idlist = [] //정보 변경된 userid 값만 넣을 리스트
    const nickname_querylist = []
    for( let i=0; i<modified_userid.length; i++){//변경사항만큼 for문돌린다
        let level_query = `when "${modified_userid[i]}" THEN ${modified_userlevel[i]} `//레벨변경 쿼리
        level_querylist.push(level_query)
        idlist.push(`"${modified_userid[i]}"`)
        let nickname_query = `when "${modified_userid[i]}" THEN "${modified_nickname[i]}" ` //닉네임변경 쿼리
        nickname_querylist.push(nickname_query)
    }
    const sql_insert1 = level_querylist.toString().replaceAll(',','') //레벨변경쿼리 리스트를 string으로 변환
    const sql_insert2 = nickname_querylist.toString().replaceAll(',','') //닉네임변경쿼리 리스트를 string으로 변환
    
    const sql = `UPDATE user set level = CASE userid
                                        ${sql_insert1}
                                        ELSE level
                                    END,
                                nickname = CASE userid
                                        ${sql_insert2}
                                        ELSE nickname
                                    END
                                where userid IN (${idlist.toString()})`
    console.log(sql)

    try {
        const [result] = await pool.execute(sql)

        const response = {
            result:"success"
        }
        console.log(response.result)
        res.json(response)

    } catch(e){
        const response = {
            
            errmsg:e.message,
            errno: e.errno
        }
        res.json(response)
    }
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

