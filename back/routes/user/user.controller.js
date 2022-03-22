//회원관리 컨트롤러

exports.join = (req,res)=>{
    res.send('가입완료')
}

exports.login = (req,res)=>{
    res.send('로그인 완료')
}

exports.update = (req,res)=>{
    res.render('/user/update')
}
