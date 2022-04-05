//회원관리 미들웨어
const express = require('express')
const router = express.Router()
const axios = require('axios')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const cate1Router = require('./cate1/index.js')
const QnARouter = require('./QnA/index.js')
const noticeRouter = require('./notice/index.js')

const app = express()

const upload = multer({
    storage:multer.diskStorage({
        destination:(req, file, done) => {
            done(null, 'uploads')
        },
        filename:(req, file, done) => {
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext
            done(null, filename)
        }
    }),
    limits: { fileSize : 5 * 1024 * 1024 }
  })

app.use(cookieParser)

router.get('/', (req, res) => {
    res.render('./board/board_main.html')
})


// cate1
router.use('/cate1', cate1Router)

// QnA
router.use('/QnA', QnARouter)

// notice
router.use('/notice', noticeRouter)

// router.use('/question', questionRouter)


module.exports = router