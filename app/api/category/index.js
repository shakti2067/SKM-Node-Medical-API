const express = require("express");
const router = express.Router()


const service = require("./category.service")
const uploadImage = require('../../utils/multer')

router.post("/", [uploadImage.single("image")], service.addCategory)
router.get("/", service.getCategory)
router.get("/parent", service.getParentCategory)




module.exports = router