//회원관리 컨트롤러
const pool = require('../../db.js').pool
const axios = require('axios')
const { createToken } = require('../../utils/jwt.js')
const qs = require('qs')
const kakaoData = {
    client_id:'1cd72de87c79f154447f6a8b228bce76',
    client_secret:'IReMXzT3wQ4m9loLFT95vHSacZdyV3pK',
    redirect_uri:'http://localhost:4000/api/user/oauth/kakao'
}


// kakao login W
exports.kakaoAuth = (req,res)=>{
    const kakaoAuthorize = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoData.client_id}&redirect_uri=${kakaoData.redirect_uri}&response_type=code`
    res.redirect(kakaoAuthorize)
}

exports.oauthkakao = async (req,res) => {
    const code = req.query.code
    const uri = 'https://kauth.kakao.com/oauth/token'
    const body = qs.stringify({
            grant_type:'authorization_code',
            client_id:kakaoData.client_id,
            client_secret:kakaoData.client_secret,
            redirect_uri:kakaoData.redirect_uri,
            code,
        })
    const headers = {'Content-type':'application/x-www-form-urlencoded'}
    const response = await axios.post(uri,body,headers)
    

    try {   
        const {access_token} = response.data
        const url = 'https://kapi.kakao.com/v2/user/me'
        const userinfo = await axios.get(url,{
            headers:{
                'Authorization': `Bearer ${access_token}`,
            }
        })
        const { nickname, profile_image_url: userimg} = userinfo.data.kakao_account.profile
        const userid = userinfo.data.kakao_account.email

        // DB 
        
        const sql2 = 'SELECT * FROM user where userid=?'
        const prepare2 = [userid]

        const [sql_result2] = await pool.execute(sql2,prepare2)
        if(sql_result2.length !== 0){
            const result = { userid,userimg,nickname,access_token }
            const jwt_token = createToken({...sql_result2[0]})
            res.cookie('token', jwt_token,{
                path:'/',
                httpOnly:true,
        })

        res.redirect('http://localhost:3000?islogin=true')
        } else{
            const sql = "INSERT INTO user(userid,nickname,userimg,userpw,username,address,gender,phone,mobile,email,userintro) values(?,?,?,'','','','','','','','')"
            const prepare = [userid,nickname,userimg]

            const [sql_result] = await pool.execute(sql,prepare)

            const sql2 = 'SELECT * FROM user where userid=?'
            const prepare2 = [userid]

            const [sql_result2] = await pool.execute(sql2,prepare2)

            const result = { userid,userimg,nickname,access_token }
            const jwt_token = createToken({...sql_result2[0]})
            res.cookie('token', jwt_token,{
                path:'/',
                httpOnly:true,
            })

            res.redirect('http://localhost:3000?islogin=true')
        }        
    } catch(e){
        console.log(e)
    }
}


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

    const sql = 'SELECT userid, userimg, username, nickname, address, gender, phone, mobile, email, level, available from user where userid = ? and userpw = ?'
    const param = [userid, userpw]
    
    try {
        const [result] = await pool.execute(sql, param)

        if( result.length === 0 ) {throw Error ('id/pw를 확인해주세요')}
        if( result[0].available === 'off') { throw new Error ('활동이 정지된 계정입니다. 관리자에게 문의 해주세요.')}
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
        if(e.message = '활동이 정지된 계정입니다. 관리자에게 문의 해주세요.') {
            const response = {
                errormsg: e.message,
                errno: 2
            }
            res.json(response)
        }
        else {
            console.log(e.message)
            const response = {
                result:[],
                errormsg:e.message,
                errno: 1
            }
            res.json(response)
        }
    }
}

exports.profile = async (req,res)=>{
    const usernickname = req.user.nickname
    const writernickname = req.body.uri4
    if(usernickname == writernickname || writernickname == undefined){
        const sql = 'SELECT userid,username,userimg,nickname,address,gender,phone,mobile,email,userintro from user where nickname=?'
        const param = [usernickname]

        try {
            const [result] = await pool.execute(sql,param)
           
            response = {
                usernickname,
                writernickname,
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
    } else{
        const sql = 'SELECT userid,username,userimg,nickname,address,gender,phone,mobile,email,userintro from user where nickname=?'
        const param = [writernickname]
        console.log(param)
        const param2 = [decodeURI(writernickname)]
        try {
            const [result] = await pool.execute(sql,param2)
            response = {
                usernickname,
                writernickname,
                result,
                errno:0
            }
            console.log(result)
            res.json(response)
    
        } catch(e){
            console.log(e.message)
            response = {
                
                errno:1
            }
            res.json(response)
        }
    }
    
}


exports.update = async (req,res)=>{
    
    const {userid,userpw,nickname,address,phone,mobile} = req.body
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

exports.logout = (req,res) => {
    res.clearCookie('token')
    res.json({})
}

exports.userprofile = async (req,res) => {
    const {userid} = req.user
    const sql = 'SELECT * from cate1 where userid=?'
    const param = [userid]
    try{
        const [result] = await pool.execute(sql,param)
        console.log(result)
        const response = {
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

exports.usercmt = async (req,res) => {
    const {userid} = req.user
    const sql = `
    SELECT c.idx, c.mcategory, c.midx, c.content, c.userid, c.nickname, c.date, count(c.idx) likes, 
    title, c.updateFlag from comment c left join cate1 l on c.midx = l.idx where c.userid=1111 group by c.idx order by count(c.idx) DESC;`
    const param = [userid]
    try{
        const [result] = await pool.execute(sql,param)
        console.log('댓글왓냐',result)
        const response = {
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

exports.userlike = async (req,res) => {
    const {userid} = req.user
    const sql = 'SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(c.idx) likes, c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx where l.userid=? group by c.idx order by count(c.idx) DESC;'
    const param = [userid]
    try{
        const [result] = await pool.execute(sql,param)
        console.log('안농',result)
        const response = {
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