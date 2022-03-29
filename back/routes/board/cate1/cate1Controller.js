const pool = require('../../../db.js').pool

exports.write = async (req,res) => {
    const {category, userid, nickname, title, content, temphash} = req.body
    const date = new Date()
    const sql = `insert into cate1
    (category, title, content, userid, nickname, date) 
    values(?,?,?,?,?,?)`
    const param = [category, title, content, userid, nickname, date]
    console.log(temphash)

    try {
        const [result] = await pool.execute(sql,param)
        // console.log(result.insertId)
        // 여까지가 글 작성 기본기능
        
        // const sql2 = `insert into cate1_like(m_idx, userid) values(?,?)`
        // const param2 = [ result.insertId, userid ]

        // const [result2] = await pool.execute(sql2,param2)
        // 여기까지가 좋아요 기능

<<<<<<< HEAD
        const sql3 = `insert into hashtag
        (hashtag_name) values(?)` 
        

        for (i = 0; i < temphash.length; i++) {
            const param3 = [temphash[i]]
            const [result3] = await pool.execute(sql3, param3)

            const sql4 = 'insert into cate1_bridge(midx, hidx) values(?, ?)'
            const param4 = [result.insertId, result3.insertId]
            const [result4] = await pool.execute(sql4, param4)
        }

=======
        // const sql3 = `insert into hashtag
        // (hashtag_name) values(?)`
        // const hashtags = [hash1, hash2, hash3, hash4, hash5] 

        // for( i = 0; i< 6; i++) {
        //     let param3 = hashtags[i]
        //     const [result3] = await pool.execute(sql, param3)
        // }
        
        

        // const sql4 = 'insert into cate1_bridge(midx, hidx) values(?,?)'
        // for ( i=0; i <6; i++) {

        //     const param4 = [result.insertId, ]

        // }
>>>>>>> 3ae5d816a94d3b4b8117f493dfbdd8bc79132e21
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

    try {
        const [result] = await pool.execute(sql,param)
        
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

        console.log(result_final)

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