const pool = require('../../../db.js').pool

exports.hashtag = async (req, res) => {
    const { idx, hash1, hash2, hash3, hash4, hash5 } = req.body
    console.log(hash1, hash2, hash3)
    const sql = `insert into hashtag
    (hashtag_name) values(?),(?),(?),(?), (?)`
    const param = [hash1, hash2, hash3, hash4, hash5]

    // `select * from hashtag where hashtag_name=?`
    // const sql2 = `insert into cate1_bridge(m_idx, hashtag_idx) values(?, ?)`
    // const param2 =  [idx, ]


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

// 임의의 갯수의 데이터를 삽입하고 싶을떈 어떻게 해야하는지 찾아볼것

