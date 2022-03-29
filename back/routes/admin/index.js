const express = require('express')
const router = express.Router()
const adminController = require('./admin.controller')
const session = require('express-session')
const Memorystore = require('memorystore')(session)


const maxAge = 1000*60*20 //60분
let sessionObj = {
    secret: "team4",
    resave : false,
    saveUninitialized: true,
    store: new Memorystore({ checkPeriod: maxAge}),
    cookie:{
        maxAge:maxAge
    }
}
router.use(session(sessionObj))


router.post('/login', adminController.login)
router.post('/userlist', adminController.userList)
router.post('/usersearch',adminController.userSearch)
router.post('/userupdate', adminController.userUpdate)
router.post('/userdelete', adminController.userDelete)

router.post('/boardlist',adminController.boardList)
router.post('/boardsearch',adminController.boardSearch)
router.post('/boardhidden', adminController.boardHidden)


module.exports = router