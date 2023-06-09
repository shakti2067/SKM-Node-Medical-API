const express = require("express")
const router = express.Router()
const controller = require("./productForm.controller")
const auth = require("../../middlewares/auth")

router.post("/", [auth.getRole], controller.addProductForm)
router.get("/", [auth.getRole], controller.getProductForm)


module.exports = router