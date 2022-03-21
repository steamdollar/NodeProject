//공지사항, 카테고리 미들웨어
exports.board = (req,res)=>{
    res.render('./admin/admin_board')
}

exports.user = (req,res)=>{
    res.render('./admin/admin_user')
}

exports.category = (req,res)=>{
    res.render('./admin/category')
}

exports.stats = (req,res)=>{
    res.render('./admin/stats')
}
