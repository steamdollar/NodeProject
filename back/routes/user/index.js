const express = require('express')
const router = express.Router()
const userController = require('./user.controller')
const upload = require('../../utils/upload')

router.post('/join',upload.single('userimg'),userController.join)
router.post('/login',userController.login)
router.post('/update',upload.single('userimg'),userController.update)
router.post('/profile',userController.profile)
router.post('/delete',userController.delete)
router.post('/logout',userController.logout)
router.post('/kakaoLogin',userController.kakaoLogin)


module.exports = router