const express = require('express')
const router = express.Router()
const userController = require('./user.controller')


router.post('/join',userController.join)
router.post('/login',userController.login)
router.post('/update',userController.update)
router.post('/profile',userController.profile)



module.exports = router