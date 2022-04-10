const pool = require('../../db.js').pool
const { default: axios } = require('axios')
const { login } = require('../user/user.controller.js')


exports.hotboard = async (req,res)=>{
    const sql = `SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes,
    c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx group by c.idx order by count(l.m_idx) DESC limit 5;`

    try {

        const [result] = await pool.execute(sql)
        console.log("등록완", result)
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

exports.hotstudent1 = async (req,res)=>{

    const sql = `select userid, nickname, count(*) as count from cate1 where category = "question" 
    group by userid, nickname order by count(*) DESC LIMIT 2;`
    try {

        const [result] = await pool.execute(sql)
        console.log("결과", result)
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

exports.hotstudent2 = async (req,res)=>{
    
    const sql2 = `select nickname, userid, count(*) as count from comment where mcategory = "question"
    group by nickname,userid order by count(*) desc limit 3;`

    try {

        const [result] = await pool.execute(sql2)
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