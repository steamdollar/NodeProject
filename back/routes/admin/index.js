const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller')

router.post('/login', adminController.loginControl)
router.post('/usercontrol',adminController.userControl)
router.post('/boardcontrol',adminController.boardControl)
router.post('/search',adminController.search)
router.post('/board/hidden', adminController.boardControl.hidden)
router.post('/user/modify', adminController.userControl.modify)

module.exports = router