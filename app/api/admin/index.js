const express = require("express");
const router = express.Router()


const service = require("./admin.service")

router.post("/register", service.register)




module.exports = router