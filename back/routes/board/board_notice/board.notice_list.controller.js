const pool = require('../../../db.js').pool

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