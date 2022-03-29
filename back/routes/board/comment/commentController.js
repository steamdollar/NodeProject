const { _values } = require('nunjucks/src/lib')

const pool = require('../../../db.js').pool

exports.view = async (req, res) => {
    const { idx, cate } = req.body

    const sql1 = 'select * from comment where mcategory=? and midx=?'
    const param1 = [cate, idx]
    // console.log(cate, idx) = (cate1, 4)
    try {
        const [result1] = await pool.execute(sql1,param1)
        const response = {
            result1,
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

exports.add = async (req, res) => {
    const { idx, cate, content, nickname, userid } = req.body
    const date = new Date()
    const sql1 = `insert into comment (mcategory, midx, content, userid, nickname, date)
    values(?,?,?,?,?,?)`
    const param1 = [cate, idx, content, userid, nickname, date]

    try {
        const [result1] = await pool.execute(sql1, param1)
        const response = {
            result1
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

exports.delete = async (req, res) => {
    const { idx } = req.body
    const sql1 = 'delete from comment where idx=?'
    const param1 = [idx]

    try {
        const [result1] = await pool.execute(sql1, param1)
        const response = {
            result1
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