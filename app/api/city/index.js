const express = require("express")
const router = express.Router()

const service = require("./city.service")

router.post("/", service.addCity)
router.get("/", service.getAllCity)
router.post("/listing", service.listing)


module.exports = router