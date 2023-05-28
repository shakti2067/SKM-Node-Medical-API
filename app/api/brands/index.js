const express = require("express");
const router = express.Router()

const service = require("./brand.service")


router.post("/", service.addBrand)



module.exports = router