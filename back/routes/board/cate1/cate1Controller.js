const pool = require('../../../db.js').pool

exports.cate1_write = async (req,res) => {
    const {category, userid, nickname, title, content} = req.body
    const date = new Date()
    const sql = `insert into cate1
    (category, title, content, userid, nickname, date) 
    values(?,?,?,?,?,?)`
    const param = [category, title, content, userid, nickname, date]
    
    const sql2 = `insert into cate1_like(m_idx, userid) values(?,?)`
    // const param2 = [ , userid]
    try {
        const [result] = await pool.execute(sql,param)
        // console.log(result.insertId)
        
        const sql2 = `insert into cate1_like(m_idx, userid) values(?,?)`
        const param2 = [ result.insertId, userid]

        const [result2] = await pool.execute(sql2,param2)

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

exports.cate1_list = async (req,res)=>{
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

exports.cate1_view = async (req,res) => {
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

exports.cate1_del = async (req,res)=>{

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

exports.cate1_update = async(req, res) => {
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

exports.cate1_like = async(req, res) => {
    const { idx, userid } = req.body

    const sql = 'insert into cate1_like(m_idx, userid) values(?,?)'
    const param = [idx, userid]
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