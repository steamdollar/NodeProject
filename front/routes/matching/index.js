const express = require('express')
const router = express.Router()

router.get('/duo', (req,res)=>{
    res.render('./matching/duo')
})

router.get('/meeting', (req,res)=>{
    res.render('./matching/meeting')
})

router.get('/mento', (req,res)=>{
    res.render('./matching/mento')
})

module.exports = router