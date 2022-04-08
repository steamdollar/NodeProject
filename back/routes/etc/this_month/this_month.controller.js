
const pool = require('../../../db').pool
exports.rank1 = async(req,res)=>{
    const sql = `select userid, nickname, count(*) as count from cate1 where category = "question" 
    group by userid, nickname order by count(*) DESC LIMIT 2;`
    try {

        const [result] = await pool.execute(sql)
        console.log("잘됏어", result)
        let rank_arr = []
        for(let i = 0; i<result.length; i++){
            result[i].idx = i + 1

        }
        console.log(result)
        const response = result
        res.json(response)
    } catch(e){
        console.log("에러남",e)
        const response = {
            error:"fail"
        }
        res.json(response)
        
    }


}

exports.rank2 = async(req,res)=>{

    const sql2 = `select nickname, userid, count(*) as count from comment where mcategory = "question"
    group by nickname,userid order by count(*) desc limit 5;`

    try {

        const [result] = await pool.execute(sql2)
        console.log("잘됏어", result)
        let rank_arr = []
        for(let i = 0; i<result.length; i++){
            result[i].idx = i + 1

        }
        console.log(result)
        const response2 = result
        res.json(response2)
    } catch(e){
        console.log("에러남",e)
        const response2 = {
            error:"fail"
        }
        res.json(response2)
        
    }
}