const pool = require('../../../db.js').pool

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