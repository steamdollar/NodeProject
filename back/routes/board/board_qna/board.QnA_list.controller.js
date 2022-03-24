const pool = require('../../../db.js').pool

exports.qna_list = async (req,res)=>{
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