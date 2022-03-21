// 회원 게시판 미들웨어
exports.list = (req,res)=>{
    res.render('./board/list')
}

exports.modify = (req,res)=>{
    res.render('./board/modify')
}

exports.notice = (req,res)=>{
    res.render('./board/notice')
}

exports.QnA = (req,res)=>{
    res.render('./board/QnA')
}

exports.view = (req,res)=>{
    res.render('./board/view')
}

exports.write = (req,res)=>{
    res.render('./board/write')
}