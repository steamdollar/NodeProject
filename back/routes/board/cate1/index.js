const pool = require('../../../db.js').pool

const express = require('express')
const router = express.Router()
const cate1Router = require('./cate1Controller.js')

router.use('/write',cate1Router.write)
router.use('/list',cate1Router.list)
router.use('/view',cate1Router.view)
router.use('/delete',cate1Router.del)
router.use('/update',cate1Router.update)

// like
router.use('/like',cate1Router.like)
router.use('/likeCancel',cate1Router.likeCancel)
router.use('/likeCount', cate1Router.likeCount)

module.exports = router
