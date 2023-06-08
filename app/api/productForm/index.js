const express = require("express")
const router = express.Router()
const service = require("./productForm.service")
const auth = require("../../middlewares/auth")

router.post("/", [auth.getRole], service.addProductForm)


module.exports = router