
const express = require('express')
const router = express.Router()
const commentRouter = require('./commentController.js')

router.use('/view', commentRouter.view)
router.use('/add', commentRouter.add)
router.use('/delete', commentRouter.delete)
router.use('/update', commentRouter.update)

module.exports = router