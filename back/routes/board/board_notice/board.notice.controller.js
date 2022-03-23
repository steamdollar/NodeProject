const pool = require('../../../db.js').pool

exports.notice = async (req,res)=>{
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