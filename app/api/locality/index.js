const express = require("express")
const router = express.Router()

const service = require("./locality.service")
const auth = require('../../middlewares/auth')

// add locality by city id
router.post("/", [auth.isAuthenticate], service.addLocality)



module.exports = router