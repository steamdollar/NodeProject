const multer = require('multer')
const path = require('path')
const pool = require('../db')

const upload = multer({
    storage:multer.diskStorage({
        destination:(req,file,done)=>{
            done(null,'public/uploads')
        },
        filename:(req,file,done)=>{
            const ext = path.extname(file.originalname)
            const filename = path.basename(file.originalname,ext) + '_' + Date.now() + ext
            done(null,filename)
        }
    }),
    limits : {filesSize : 5 * 1024 * 1024}
})

module.exports = upload

