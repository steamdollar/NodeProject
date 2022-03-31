const express = require('express')
const router = express.Router()
const cate1Router = require('./cate1Controller.js')
const upload = require('../../../utils/upload.js')

router.use('/write', cate1Router.write)
router.use('/list',cate1Router.list)
router.use('/view',cate1Router.view)
router.use('/delete',cate1Router.del)
router.use('/update',cate1Router.update)

// like
router.use('/like',cate1Router.like)
router.use('/likeCancel',cate1Router.likeCancel)
router.use('/likeCount', cate1Router.likeCount)

// hashtag
router.use('/hashtagLoad', cate1Router.hashtagLoad)

// imgUpload
router.use('/imageUpload', upload.fields([{name:'img1'},{name:'img2'},
{name:'img3'},{name:'img4'},{name:'img5'}]), cate1Router.imgUp)

module.exports = router
