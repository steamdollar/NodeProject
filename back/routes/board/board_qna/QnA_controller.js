const pool = require('../../../db.js').pool

exports.QnA_list = async (req,res)=>{
    const sql = `select * from QnA`
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

exports.QnA_write = async (req,res) => {
    const {userid, title, content} = req.body
    const date = new Date()
    const sql = `insert into QnA(title, content, userid, date) values(?,?,?,?) `
    const param = [title, content, userid, date]

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

exports.QnA_view = async (req,res) => {
    const { idx } = req.body
    const sql = `select * from QnA where idx=?`
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

exports.QnA_del = async (req,res)=>{
    console.log('요청 옴')
    const {idx} = req.body
    console.log(idx)
    const sql = `delete from QnA where idx=?`
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

exports.QnA_update = async(req, res) => {
    const {title, content, idx} = req.body
    const date = new Date()

    const sql = `update QnA set title=?, content=?, date=? where idx=?`
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