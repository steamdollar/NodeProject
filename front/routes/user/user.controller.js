exports.join = (req,res)=>{
    res.render('./user/join')
}

exports.login = (req,res)=>{
    res.render('./user/login')
}

exports.update = (req,res)=>{
    res.render('./user/update')
}

exports.profile = (req,res)=>{
    res.render('./user/profile')
}

exports.welcome = (req,res)=>{
    res.render('./user/welcome')
}