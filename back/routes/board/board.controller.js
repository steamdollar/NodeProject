// 회원 게시판 컨트롤러exports.join = (req,res)=>{

    exports.write = (req,res) =>{
        res.send('글 등록 완료')
    }
    
    
    exports.modify = (req,res) =>{
        res.send('글 수정 완료')
    }
    
    exports.delete = (req,res) =>{
        res.send('글 삭제 완료')
    }
    
    exports.notice = (req,res)=>{
        res.send('공지글 작성 완료')
    }
    // 공지글 수정, 삭제 같은 경우 필요하면 추후에 추가로 작성
    exports.QnA = (req,res) =>{
        res.send('질문 등록')
    }
    
    