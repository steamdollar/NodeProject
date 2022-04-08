const express = require('express')
const router = express.Router()

router.get('/introduce',(req,res) =>{
    res.render('./community/introduce')
})

module.exports = router