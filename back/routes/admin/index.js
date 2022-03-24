const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller')

router.post('/login', adminController.login)
router.post('/userlist', adminController.userList)
router.post('/usersearch',adminController.userSearch)
router.post('/userupdate', adminController.userUpdate)
router.post('/userdelete', adminController.userDelete)

router.post('/boardsearch',adminController.boardSearch)
router.post('/boardhidden', adminController.boardHidden)


module.exports = router