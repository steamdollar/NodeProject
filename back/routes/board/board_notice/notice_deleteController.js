const pool = require('../../../db.js').pool

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