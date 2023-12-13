const express = require("express");
const router = express.Router()
const auth = require("../../middlewares/auth")
const service = require("./admin.service")




router.post("/register", service.register)
router.post("/login", service.adminLogin)
router.get("/getAdminModuleByRole", [auth.getRole], service.getAdminModuleByRole)
router.get("/logout", [auth.getRole], service.logout)
router.post("/changePassword", [auth.getRole], service.changePassword)
router.post("/forgotPassword", service.adminForgotPassword)


module.exports = router