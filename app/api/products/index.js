const express = require("express");
const router = express.Router()

const service = require("../products/product.service")

const uploadImage = require("../../utils/multer")


router.post("/", [uploadImage.single("image")], service.addProduct)
router.get("/", service.getProduct)
router.get("/:categoryId", service.getProductByCategory)




module.exports = router;