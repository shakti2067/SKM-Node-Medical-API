const express = require('express')

const service = require('./user.service')
const router = express()

const auth = require("../../middlewares/auth")

router.post('/', service.register)
router.post("/loginInitiate", service.loginInitiate)
router.post("/verifyOtp", service.verifyOtp)
router.post("/sendOtp", service.sendOtp)
router.post("/login", service.login)
router.get("/token", [auth.isAuthenticate], service.getUserByToken)
router.post("/logout", [auth.isAuthenticate], service.userLogOut)



module.exports = router