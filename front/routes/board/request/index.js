// request list
const express = require('express')
const router = express.Router()
const axios = require('axios')

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

router.get('/', async (req,res) => {
 
    res.render('./board/request/request_list.html')
})

module.exports = router