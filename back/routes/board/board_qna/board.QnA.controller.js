const pool = require('../../../db.js').pool

exports.QnA = async (req,res) => {
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