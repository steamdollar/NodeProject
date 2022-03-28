const pool = require('../../../db.js').pool

exports.notice_write = async (req,res)=>{
    const {userid, title, content} = req.body
    const date = new Date()
    const sql = `insert into notice(writer, title,content, date) values(?,?,?,?) `
    const param = [userid, title, content, date]

    try {
        const [result] = await pool.execute(sql,param)
        
        const response = {
            errno:0,
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

exports.notice_list = async (req,res)=>{
    const sql = `select * from notice where writer=?`
    const param = ['admin']
    try {
        const [result] = await pool.execute(sql,param)
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

exports.notice_view = async (req,res)=>{
    const {idx} = req.body
    console.log(idx)
    const sql = `select * from notice where idx=?`
    const param = [idx]
    try {
        const [result] = await pool.execute(sql,param)
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

exports.notice_del = async (req,res)=>{
    console.log('요청 옴')
    const {idx} = req.body
    console.log(idx)
    const sql = `delete from notice where idx=?`
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

exports.notice_update = async(req, res) => {
    const {title, content, idx} = req.body
    const date = new Date()

    const sql = `update notice set title=?, content=?, date=? where idx=?`
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