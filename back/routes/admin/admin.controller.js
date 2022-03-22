//관리자페이지 컨트롤러(회원관리, 게시물관리, 카테고리, 통계)

exports.userControl = (req,res)=>{
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