//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const axios = require('axios')
const qs = require('qs')
const { createToken } = require('../../../back/utils/jwt')
const kakaoData = {
    client_id:'3d8149cfd84df4adb0e342aacd571400',
    client_secret:'IReMXzT3wQ4m9loLFT95vHSacZdyV3pK',
    redirect_uri:'http://localhost:3000/user/oauth/kakao'
}

let update = {}



router.use('/kakao/login',(req,res)=>{
    const kakaoAuthorize = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoData.client_id}&redirect_uri=${kakaoData.redirect_uri}&response_type=code`
    res.redirect(kakaoAuthorize)
})

router.use('/oauth/kakao', async (req,res)=>{
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
   
    console.log('잘왔누',response.data.access_token)
    

    try {   
        const {access_token} = response.data
        const url = 'https://kapi.kakao.com/v2/user/me'
        const userinfo = await axios.get(url,{
            headers:{
                'Authorization': `Bearer ${access_token}`,
            }
        })
        const { nickname, profile_image: img} = userinfo.data.properties
        const result = { nickname, img}
        const jwt_token = createToken(result)

        res.cookie('kakaoToken', jwt_token,{
            path:'/',
            httpOnly:true,
            domain:'localhost'
        })

        // console.log(req.cookies.kakaoToken)
        const {kakaoToken} = req.cookies
        console.log(kakaoToken)
        if(kakaoToken !== undefined){
            res.render('main')
        }
        else(
            res.render('main2')
        )
        
        

        // const nickname = userinfo.data.kakao_account.profile.nickname
        // const userimg = userinfo.data.kakao_account.profile.profile_image_url

        // const result = {nickname,userimg} 
        // console.log(result)
    } catch(e){
        console.log(e)
    }
    
})

router.use('/join',(req,res)=>{
    res.render('./user/join')
})

router.use('/login', (req,res)=>{
    res.render('./user/login')
})

router.use('/update', (req,res)=>{
    
    const {token} = req.cookies
    

    if(token !== undefined) {
    const userid = token.split('.')
    const deUserid = JSON.parse(Buffer.from(userid[1], 'base64').toString('utf-8'))
    console.log(deUserid)
    update = { ...deUserid }
    console.log(update)
    

    res.render('./user/update',{
        user:update
    })
  } else {
      console.log('안됨')
  }
   
})

router.use('/profile', (req,res)=>{
    
    // const {token} = req.cookies
    
    // if(token !== undefined) {
    // const userid = token.split('.')
    // const deUserid = JSON.parse(Buffer.from(userid[1], 'base64').toString('utf-8'))
    // console.log(deUserid)
    // profile = { ...deUserid }
    // console.log(update)
    

    res.render('./user/profile')
    //         user:profile
    //     })
    // } else {
    //     console.log('안됨')
    // }
})

router.use('/welcome', (req,res)=>{
    res.render('./user/welcome')
})



module.exports = router