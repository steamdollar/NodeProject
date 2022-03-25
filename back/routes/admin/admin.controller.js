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
    const before = body.beforeData
    const current = body.currentData
    const search_before = body.search_beforeData
    console.log("리스트 이전데이터" ,before.userid.length, "현재데이터",current.userid.length, "검색후수정전데이터",search_before.userid.length)
    if(current.userid.length == before.userid.length){
        for(let i=0; i<current.userid.length; i++){
            if(before.level[i]!== current.level[i]){
                modified_userid.push(current.userid[i])
                modified_userlevel.push(current.level[i])
    
            }
        }
        
    }
    else if(search_before.userid.length == current.userid.length){
        for(let i=0; i<current.userid.length; i++){
            if(search_before.level[i]!== current.level[i]){
                modified_userid.push(current.userid[i])
                modified_userlevel.push(current.level[i])
    
            }
        }
    }
    console.log("변경사항", modified_userid, modified_userlevel)




    let query = []
    const INSERT_sql = []
    for( let i=0; i<modified_userid.length; i++){
        let querylist = `when "${modified_userid[i]}" THEN ${modified_userlevel[i]} `
        query.push(querylist)
        INSERT_sql.push(`"${modified_userid[i]}"`)
    }
    const sql_insert = query.toString().replaceAll(',','')
    
    const sql = `UPDATE user set level = CASE userid
                                        ${sql_insert}
                                        ELSE level
                                    END
                                where userid IN (${INSERT_sql.toString()})`
    console.log(sql)

    try {
        const [result] = await pool.execute(sql)

        const response = {
            result:"success"
        }
        console.log(response.result)
        res.json(response)

    } catch(e){
        console.log(e.message)
        const response = {
            result:"error"
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

