const pool = require('../../../db.js').pool

exports.write = async (req,res) => {
    const {category, userid, nickname, title, content, temphash, formData} = req.body
    const date = new Date()

    const sql = `insert into cate1
    (category, title, content, userid, nickname, date) 
    values(?,?,?,?,?,?)`
    const param = [category, title, content, userid, nickname, date]
    // console.log(param)
    try {
        const [result] = await pool.execute(sql,param)

        const sql3 = `insert into hashtag
        (hashtag_name) values(?)` 
        

        for (i = 0; i < temphash.length; i++) {
            const param3 = [temphash[i]]
            const [result3] = await pool.execute(sql3, param3)

            const sql4 = 'insert into cate1_bridge(midx, hidx) values(?, ?)'
            const param4 = [result.insertId, result3.insertId]
            const [result4] = await pool.execute(sql4, param4)
        }

        const response = {
            errno:0,
            result,
            insertId:result.insertId
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

exports.list = async (req,res)=>{
    const {category} = req.body
    const sql1 = `SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes, c.hidden from cate1 c left join cate1_like l on c.idx = l.m_idx where c.category = '${category}' group by c.idx;`
    const sql2 = `SELECT count(idx) as total_record FROM cate1 where hidden = 'off' and category = '${category}'`
    try {
        const [result1] = await pool.execute(sql1)
        const [[{total_record}]] = await pool.execute(sql2)
        const response = {
            result1,
            total_record,
            errno:0
        }
        res.json(response) 
    } 
    catch (e) {
        const response = {
            errormsg: e.message
        }
        res.json(response)  
    }
}

exports.check = async (req, res) => {
    const {idx} = req.body
    const sql1 = `select * from cate1 where idx = ?`
    const param1 = [idx]

    try {
        const [result1] = await pool.execute(sql1, param1)
        if(result1[0].hidden == 'on') {
            const response = {
                hidden:'on'
            }
            res.json(response)
        }
        else {
            const response = {
                hidden:'off'
            }
            res.json(response)
        }
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }
        res.json(response)  
    }
}

exports.view = async (req,res) => {
    const { idx } = req.body
    const sql = `select * from cate1 where idx=?`
    const param = [idx]
    const sql2 = `update cate1 set hit=hit+1 where idx=?`

    try {
        const [result2] = await pool.execute(sql2,param)
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

exports.viewuser = async (req,res) => {

    const {nickname} = req.user
    const sql = `select * from user where nickname=?`
    const param = [nickname]
    try{
        const [result] = await pool.execute(sql,param)

        const response = {
            result,
            errno:0
        }
        res.json(response)
        
    } catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: 1
        }
        
        res.json(response)   
    }
}


exports.del = async (req,res)=>{
    const {idx, category, writerid, userid} = req.body

    const sql = `select * from cate1_bridge where midx = ?`
    const param = [idx]

    try {
        if( writerid !== userid ) { throw new Error('작성자가 아님') }
        const [result] = await pool.execute(sql,param)

        for (i = 0; i<result.length; i++) {
            const sql2 = `delete from hashtag where hidx=?`
            const param2 = [result[i].hidx]
            const [result2] = await pool.execute(sql2, param2)
            //console.log(result2)
        }

        const sql3 = 'delete from cate1_bridge where midx=?'
        const [result3] = await pool.execute(sql3, param)
        
        const sql4 = 'delete from cate1 where idx=?'
        const [result4] = await pool.execute(sql4,param)

        const sql5 = 'delete from cate1_like where m_idx=?'
        const result5 = await pool.execute(sql5,param)

        const sql6 = 'delete from image where category=? and midx=?'
        const param6 = [category, idx]
        const result6 = await pool.execute(sql6,param6)

        const response = {
            result,
            result3,
            result4,
            errno:0
        }
        res.json(response) 
    } 
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno:1
        }
        res.json(response)  
    }
}

exports.update = async(req, res) => {
    const {title, content, idx, temphash} = req.body
    const date = new Date()
    // console.log(temphash) // [ '#qwe', '#asd' ]

    const sql = `update cate1 set title=?, content=?, date=? where idx=?`
    const param = [title, content, date, idx]
    try {
        const [result] = await pool.execute(sql,param)

        const sql2 = 'select * from cate1_bridge where midx=?'
        const param2 = [idx]
        
        const [result2] = await pool.execute(sql2, param2)

        for (i=0; i<result2.length; i++) {
            const sql3 = `delete from hashtag where hidx=?`
            const param3 = [result2[i].hidx]
            const [result3] = await pool.execute(sql3, param3)
        }

        const sql4 = `delete from cate1_bridge where midx=?`
        const param4 = [idx]
        const [result4] = await pool.execute(sql4, param4)
        // 기존 해시태그 삭제

        for (i = 0; i < temphash.length; i++) {
            const sql5 = `insert into hashtag
            (hashtag_name) values(?)` 
            const param5 = [temphash[i]]
            const [result5] = await pool.execute(sql5, param5)

            const sql6 = 'insert into cate1_bridge(midx, hidx) values(?, ?)'
            const param6 = [idx, result5.insertId]
            const [result6] = await pool.execute(sql6, param6)
        }

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

// like

exports.like = async(req, res) => {
    const { idx, userid } = req.body
    const sql1 = 'select * from cate1_like where m_idx=? and userid=?'
    const sql2 = 'insert into cate1_like(m_idx, userid) values(?,?)'
    const param = [idx, userid]

    try {
        const [result] = await pool.execute(sql1, param)

        if (result.length != 0) { throw new Error('좋아요 cancel') }
        
        const [result2] = await pool.execute(sql2, param)

        const response = {
            result2,
            errno:0
        }
        res.json(response) 
    }
    catch (e) {
        console.log(e.message)
        const sql = 'delete from cate1_like where m_idx=? and userid=?'
        const [result3] = await pool.execute(sql, param)
        const response = {
            errormsg: e.message,
            errno:1
        }
        
        res.json(response) 
    }
}

//

exports.likeCount = async(req, res) => {
    const { idx } = req.body

    const sql = 'select count(m_idx) from cate1_like where m_idx=?'
    const param = [idx]

    try {
        const [result] = await pool.execute(sql, param)
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

// hashtag

exports.hashtagLoad = async (req, res) => {
    const {idx} = req.body
    const sql = 'select * from cate1_bridge where midx=?'
    const param = [idx]
    const result_final = []
    try {
        const [result] = await pool.execute(sql, param)
        //console.log(result) // [ { midx: 36, hidx: 1 }, { midx: 36, hidx: 2 } ]
        // console.log(result[0].midx) // 36

        for(i=0; i<result.length; i++) {
            const sql2 = 'select * from hashtag where hidx=?'
            const param2 = [result[i].hidx]
            const [result2] = await pool.execute(sql2, param2)
            result_final.push(result2[0])
        }

        const response = {
            result_final,
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

// image

exports.imgUp = async (req, res) => {
    const { midx, category } = req.body

    let images = []
    for(let i=1; i<=5; i++) {
        try {
            const [img] = req.files[`img`+i] 
            images.push(img.filename)
        }catch(e){
            images.push('N/A')
        }
    }

    const sql1 = `insert into image(midx, category, img1, img2, img3, img4, img5)
     values(?,?,?,?,?,?,?)`
    const param1 = [midx, category, ...images]

    try {
        const [result1] = await pool.execute(sql1, param1)

        const response = {
            result1,
            errno:0,
            insertId:result1.insertId
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

exports.imgLoad = async (req, res) => {
    const {idx} = req.body

    const sql1 = `select * from image where midx=?`
    const param1 = [idx]

    try {
        const [result1] = await pool.execute(sql1, param1)

        const response = {
            result1,
            errno:0,
        }
        res.json(response)

    }
    catch(e) {
        console.log(e.message)
        const response = {
            errormsg: e.message
        }

        res.json(response)
    }
}

exports.imgUpdate = async (req, res) => {
    const { idx, category, originLength } = req.body

    let images = []
    for(let i=1; i<=5; i++) {
        try {
            const [img] = req.files[`img`+i] 
            images.push(img.filename)
        }
        catch(e) {
            images.push('N/A')
        }
    }

    try {
        let final_result = []
        for ( let i = 0; i < images.length; i++) {
            const sql1 = `update image set img${i+1} = ? where midx=? and category=?`
            // console.log(sql1)
            const param1 = [images[i], idx, category] 

            const [result1] = await pool.execute(sql1, param1)
            final_result.push(result1)
        }

        const response = {
            final_result,
            errno:0,
        }
        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg : e.message
        }
        res.json(response)
    }
}

// `update cate1 set title=?, content=?, date=? where idx=?`
// thumbnail

exports.thumbnail = async (req, res) => {
    const { category } = req.body

    const sql = `select * from cate1 where hidden = 'off' and category = "${category}";`
    const param1 = [category]

    try {
        const [result] = await pool.execute(sql, param1)
        // console.log(result[0]) // [{}, {}, {}]
        let final_result = []

        for ( let i = 0; i < result.length; i++ ) {
            const sql1 = `select img1 from image where category=? and midx=?`
            const param1 = [category, result[i].idx]
            // console.log(result[i].idx)
            const [[result1]] = await pool.execute(sql1, param1)
            final_result.push(result1)
        }

        const response = {
            final_result
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

// 검색

exports.search = async (req, res) => {
    const {searchKey,searchOp, category} = req.body

    if( searchOp !== 'hashtag') {
        const sql = ` SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, c.date, c.hit, count(l.m_idx) likes, c.hidden 
        from ${category} c left join ${category}_like l on c.idx = l.m_idx 
        WHERE c.${searchOp} LIKE "%${searchKey}%" group by c.idx ;`

        try {
            const [result] = await pool.execute(sql)
            const response = {
                result,
                errorno: "none"
            }
            res.json(response)

        } catch(e){
            const response = {
                errormsg: e.message,
                errno: e.errno
            }

            res.json(response)
        }
    }
    else {
        const sql1 = `select * from hashtag where hashtag_name=?`
        const param1 = [searchKey]
        const result1 = await pool.execute(sql1, param1)
        
        let midx = []
        try {
            for (let i=0; i<result1[0].length; i++) {
                const sql2 = `select * from cate1_bridge where hidx=?`
                const param2 = [result1[0][i].hidx]

                const [result2] = await pool.execute(sql2, param2)
                midx.push(result2[0])
            }
            const sql3 = ` SELECT c.idx, c.category, c.userid, c.nickname, c.title, c.content, 
            c.date, c.hit, count(l.m_idx) likes, c.hidden 
            from ${category} c left join ${category}_like l on c.idx = l.m_idx 
            WHERE c.idx= ? group by c.idx ;`
            let final = []
            for(let i = 0; i<midx.length; i++) {
                const param3 = [midx[i].midx]
                const [result3] = await pool.execute(sql3, param3)

                final.push(result3[0])
            }

            const result = final
            const response = {
                result,
                errorno: "none"
            }
            res.json(response)
        }
        catch (e) {
            console.log(e.message)
            const response = {
                errormsg: e.message,
                errno: e.errno
            }
            res.json(response)
        }
    }
}

exports.searchThumbNail = async (req, res) => {
    const { thumbIdx } = req.body

    const sql = `select img1 from image where midx=?`
    let final_result = []
    try {
        for (let i = 0; i< thumbIdx.length; i++) {
            const param = [thumbIdx[i]]
            const [[result]] = await pool.execute(sql, param)
            final_result.push(result)
        }

        const response = {
            final_result,
            errorno: "none"
        }
        res.json(response)
    }
    catch (e) {
        console.log(e.message)
        const response = {
            errormsg: e.message,
            errno: e.errno
        }
        res.json(response)
    }
}