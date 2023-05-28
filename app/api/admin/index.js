const express = require("express");
const router = express.Router()
const auth = require("../../middlewares/auth")
const service = require("./admin.service")




router.post("/register", service.register)
router.post("/login", service.adminLogin)
router.get("/getAdminModuleByUser", [auth.getRole], service.getAdminModuleByUser)
router.get("/logout", [auth.getRole], service.logout)




module.exports = router