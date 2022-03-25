const pool = require('../../../db.js').pool

const express = require('express')
const router = express.Router()
const cate1Router = require('./cate1Controller.js')

router.use('/write',cate1Router.cate1_write)
router.use('/list',cate1Router.cate1_list)
router.use('/view',cate1Router.cate1_view)
router.use('/delete',cate1Router.cate1_del)
router.use('/update',cate1Router.cate1_update)

module.exports = router
