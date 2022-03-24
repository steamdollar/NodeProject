const pool = require('../../../db.js').pool

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