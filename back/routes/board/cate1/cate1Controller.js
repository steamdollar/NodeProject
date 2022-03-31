const pool = require('../../../db.js').pool

exports.write = async (req,res) => {
    const {category, userid, nickname, title, content, temphash, formData} = req.body
    const date = new Date()

    const sql = `insert into cate1
    (category, title, content, userid, nickname, date) 
    values(?,?,?,?,?,?)`
    const param = [category, title, content, userid, nickname, date]
    console.log(param)
    try {
        const [result] = await pool.execute(sql,param)

        const sql3 = `insert into hashtag
        (hashtag_name) values(?)` 
        

        for (i = 0; i < temphash.length; i++) {
            const param3 = [temphash[i]]
            const [result3] = await pool.execute(sql3, param3)

            const sql4 = 'insert into cate1_bridge(midx, hidx) values(?, ?)'
            const param4 = [result.insertId, result3.insertId]
            const [result4] = await pool.execute(sql4, param4)
        }

        const response = {
            errno:0,
            result,
            insertId:result.insertId
        }
        res.json(response)
        
    } 
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: 1
        }
        
        res.json(response)  
    }
}

exports.list = async (req,res)=>{
    const sql = `select * from cate1`
    // const param = ['admin']
    try {
        const [result] = await pool.execute(sql)
        const response = {
            result,
        }
        res.json(response) 
    } 
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }
        res.json(response)  
    }
}

exports.view = async (req,res) => {
    const { idx } = req.body
    const sql = `select * from cate1 where idx=?`
    const param = [idx]

    const sql2 = `update cate1 set hit=hit+1 where idx=?`

    try {
        const [result] = await pool.execute(sql,param)
        const [result2] = await pool.execute(sql2,param)
        
        const response = {
            errno:0,
            result
        }
        res.json(response) 
    } 
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: 1
        }
        
        res.json(response)  
    }
}

exports.del = async (req,res)=>{
    const {idx} = req.body

    const sql = `select * from cate1_bridge where midx = ?`
    const param = [idx]

    try {
        const [result] = await pool.execute(sql,param)

        for (i = 0; i<result.length; i++) {
            const sql2 = `delete from hashtag where hidx=?`
            const param2 = [result[i].hidx]
            const [result2] = await pool.execute(sql2, param2)
            //console.log(result2)
        }

        const sql3 = 'delete from cate1_bridge where midx=?'
        const [result3] = await pool.execute(sql3, param)
        
        const sql4 = 'delete from cate1 where idx=?'
        const [result4] = await pool.execute(sql4,param)

        const sql5 = 'delete from cate1_like where m_idx=?'
        const result5 = await pool.execute(sql5,param)

        const response = {
            result,
            result3,
            result4,
            errno:0
        }
        res.json(response) 
    } 
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }
        
        res.json(response)  
    }
}

exports.update = async(req, res) => {
    const {title, content, idx, temphash} = req.body
    const date = new Date()
    // console.log(temphash) // [ '#qwe', '#asd' ]

    const sql = `update cate1 set title=?, content=?, date=? where idx=?`
    const param = [title, content, date, idx]
    try {
        const [result] = await pool.execute(sql,param)

        const sql2 = 'select * from cate1_bridge where midx=?'
        const param2 = [idx]
        
        const [result2] = await pool.execute(sql2, param2)

        for (i=0; i<result2.length; i++) {
            const sql3 = `delete from hashtag where hidx=?`
            const param3 = [result2[i].hidx]
            const [result3] = await pool.execute(sql3, param3)
        }

        const sql4 = `delete from cate1_bridge where midx=?`
        const param4 = [idx]
        const [result4] = await pool.execute(sql4, param4)
        // 기존 해시태그 삭제

        for (i = 0; i < temphash.length; i++) {
            const sql5 = `insert into hashtag
            (hashtag_name) values(?)` 
            const param5 = [temphash[i]]
            const [result5] = await pool.execute(sql5, param5)

            const sql6 = 'insert into cate1_bridge(midx, hidx) values(?, ?)'
            const param6 = [idx, result5.insertId]
            const [result6] = await pool.execute(sql6, param6)
        }


        const response = {
            result,
            errno:0
        }
        res.json(response) 
    } 
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }
        
        res.json(response)  
    }
}

// like

exports.like = async(req, res) => {
    const { idx, userid } = req.body
    const sql1 = 'select * from cate1_like where m_idx=? and userid=?'
    const sql2 = 'insert into cate1_like(m_idx, userid) values(?,?)'
    const param1 = [idx, userid]
    const param2 = [idx, userid]

    try {
        const [result] = await pool.execute(sql1, param1)

        if (result.length != 0) { throw new Error('좋아요는 한 번만 가능합니다') }
        
        const [result2] = await pool.execute(sql2, param2)

        const response = {
            result2,
            errno:0
        }
        res.json(response) 
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno:1
        }
        
        res.json(response) 
    }
}

//

exports.likeCancel = async (req, res) => {
    const { idx, userid } = req.body
    const sql1 = 'select * from cate1_like where m_idx=? and userid=?'
    const sql2 = 'delete from cate1_like where m_idx=? and userid=?'
    const param1 = [idx, userid]
    const param2 = [idx, userid]

    try {
        const [result] = await pool.execute(sql1, param1)

        if( result.length == 0 ) { throw new Error('좋아요를 누른 적이 없습니다') }

        const [result2] = await pool.execute(sql2, param2)

        const response = {
            result2,
            errno:0
        }
        res.json(response) 

    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno:2
        }
        
        res.json(response) 
    }
}

//

exports.likeCount = async(req, res) => {
    const { idx } = req.body

    const sql = 'select count(m_idx) from cate1_like where m_idx=?'
    const param = [idx]

    try {
        const [result] = await pool.execute(sql, param)
        const response = {
            result,
            errno:0
        }
        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }

        res.json(response)
    }
}

// hashtag

exports.hashtagLoad = async (req, res) => {
    const {idx} = req.body
    const sql = 'select * from cate1_bridge where midx=?'
    const param = [idx]
    const result_final = []
    try {
        const [result] = await pool.execute(sql, param)
        //console.log(result) // [ { midx: 36, hidx: 1 }, { midx: 36, hidx: 2 } ]
        // console.log(result[0].midx) // 36

        for(i=0; i<result.length; i++) {
            const sql2 = 'select * from hashtag where hidx=?'
            const param2 = [result[i].hidx]
            console.log(param2)
            const [result2] = await pool.execute(sql2, param2)
            result_final.push(result2[0])
        }

        const response = {
            result_final,
            errno:0
        }
        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }

        res.json(response)
    }
}

// image

exports.imgUp = async (req, res) => {
    const { midx, category } = req.body
    
    let images = []
    for(let i=1; i<=5; i++) {
        try {
            const [img] = req.files[`img`+i] 
            images.push(img.filename)
        }catch(e){
            images.push('N/A')
        }
    }

    const sql1 = `insert into image(midx, category, img1, img2, img3, img4, img5)
     values(?,?,?,?,?,?,?)`
    const param1 = [midx, category, ...images]
    console.log(param1)

    try {
        const [result1] = await pool.execute(sql1, param1)

        const response = {
            result1,
            errno:0,
            insertId:result1.insertId
        }
        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }

        res.json(response)
    }
}

// [
//     '16',
//     'cate1',
//     [
//       {
//         fieldname: 'img1',
//         originalname: 'KakaoTalk_20181005_175105183.png',
//         encoding: '7bit',
//         mimetype: 'image/png',
//         destination: 'public/uploads',
//         filename: 'KakaoTalk_20181005_175105183_1648692219017.png',
//         path: 'public/uploads/KakaoTalk_20181005_175105183_1648692219017.png',
//         size: 482907
//       }
//     ],
//     [
//       {
//         fieldname: 'img2',
//         originalname: 'KakaoTalk_20190521_184055075.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: 'public/uploads',
//         filename: 'KakaoTalk_20190521_184055075_1648692219032.jpg',
//         path: 'public/uploads/KakaoTalk_20190521_184055075_1648692219032.jpg',
//         size: 157825
//       }
//     ],
//     [
//       {
//         fieldname: 'img3',
//         originalname: 'KakaoTalk_20211002_223622035.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: 'public/uploads',
//         filename: 'KakaoTalk_20211002_223622035_1648692219036.jpg',
//         path: 'public/uploads/KakaoTalk_20211002_223622035_1648692219036.jpg',
//         size: 1847083
//       }
//     ],
//     [
//       {
//         fieldname: 'img4',
//         originalname: '안준영2.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: 'public/uploads',
//         filename: '안준영2_1648692219071.jpg',
//         path: 'public/uploads/안준영2_1648692219071.jpg',
//         size: 865814
//       }
//     ],
//     [
//       {
//         fieldname: 'img5',
//         originalname: '증명사진 수정.jpg',
//         encoding: '7bit',
//         mimetype: 'image/jpeg',
//         destination: 'public/uploads',
//         filename: '증명사진 수정_1648692219085.jpg',
//         path: 'public/uploads/증명사진 수정_1648692219085.jpg',
//         size: 61270
//       }
//     ]
//   ]