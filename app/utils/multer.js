const multer = require("multer")
const path = require("path")



const uploadImage = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, "../public/upload"))
        },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname)
            let fileName = file.fieldname + "-" + Date.now() + ext

            cb(null, fileName)
        }
    })
})




module.exports = uploadImage


