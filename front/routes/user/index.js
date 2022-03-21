//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const usercontroller = require('./user.controller')

router.use('/join',usercontroller.join)

router.use('/login', usercontroller.login)

router.use('/update', usercontroller.update)

router.use('/profile', usercontroller.profile)

router.use('/welcome', usercontroller.welcome)

module.exports = router