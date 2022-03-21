//라우터
const express = require('express')
const app = express()
const router = express.Router()

const userRouter = require('./user/user.controller')
const boardRouter = require('./board/board.controller')
const adminRouter = require('./admin/admin.controller')


//user
router.post('/api/user/join',userRouter.join)
router.post('/api/user/login',userRouter.login)
router.post('/api/user/update',userRouter.update)

//board
router.post('/api/board/write',boardRouter.write)
router.post('/api/board/modify',boardRouter.modify)
router.post('/api/board/QnA',boardRouter.QnA)
router.post('/api/board/delete',boardRouter.delete)
router.post('/api/board/notice',boardRouter.notice)

//admin
router.post('/api/admin/usercontrol',adminRouter.userControl)
router.post('/api/admin/boardcontrol',adminRouter.boardControl)

module.exports = router