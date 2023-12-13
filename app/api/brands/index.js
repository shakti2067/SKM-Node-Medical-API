const express = require("express");
const router = express.Router()
const service = require("./brand.service")
const auth = require("../../middlewares/auth")

router.post("/", [auth.getRole], service.addBrand)
router.get("/:categoryId", [auth.isAuthenticate], service.getBrandByCategoryId)
router.put('/:id', [auth.getRole], service.updateBrand)



module.exports = router