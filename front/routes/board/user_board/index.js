//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const userboardcontroller = require('./userboard.controller')

router.use('/list',usercontroller.join)

router.use('/modify', usercontroller.login)

router.use('/notice', usercontroller.update)

router.use('/QnA', usercontroller.QnA)

router.use('/welcome', usercontroller.welcome)

module.exports = router