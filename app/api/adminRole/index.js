const express = require("express")
const router = express.Router()
const service = require("./adminRole.service")

router.post("/", service.addAdminRole)
router.get("/:id", service.getAdminRoleById)
router.get("/", service.getAllAdminRole)




module.exports = router