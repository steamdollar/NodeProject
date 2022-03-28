const pool = require('../../../db.js').pool

exports.write = async (req,res) => {
    const {category, userid, nickname, title, content, hash1, 
    hash2, hash3, hash4, hash5} = req.body
    const date = new Date()
    const sql = `insert into cate1
    (category, title, content, userid, nickname, date) 
    values(?,?,?,?,?,?)`
    const param = [category, title, content, userid, nickname, date]

    const result_final = {}
    try {
        const [result] = await pool.execute(sql,param)
        // console.log(result.insertId)
        // 여까지가 글 작성 기본기능
        
        const sql2 = `insert into cate1_like(m_idx, userid) values(?,?)`
        const param2 = [ result.insertId, userid]

        const [result2] = await pool.execute(sql2,param2)
        // 여기까지가 좋아요 기능

        const sql3 = `insert into hashtag
        (hashtag_name) values(?)`
        const hashtags = [hash1, hash2, hash3, hash4, hash5] 

        for( i = 0; i < 5; i++) {
            const param3 = hashtags[i]
            const [result3] = await pool.execute(sql3, param3)
        }
        
        // const sql4 = 'insert into cate1_bridge(midx) values(?)'
        // for ( i = 0; i < 5; i++) {
        //     const param4 = [result.insertId]
        //     const [result4] = await pool.execute(sql4, param4)
        //     result_final = {...result4}
        // }

        const response = {
            errno:0,
            result_final
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

    const sql = `delete from cate1 where idx=?`
    const param = [idx]
    try {
        const [result] = await pool.execute(sql,param)
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

exports.update = async(req, res) => {
    const {title, content, idx} = req.body
    const date = new Date()

    const sql = `update cate1 set title=?, content=?, date=? where idx=?`
    const param = [title, content, date, idx]
    try {
        const [result] = await pool.execute(sql,param)
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