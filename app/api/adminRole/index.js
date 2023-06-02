const express = require("express")
const router = express.Router()
const service = require("./adminRole.service")
const auth = require("../../middlewares/auth")

router.post("/", [auth.getRole], service.addAdminRole)
router.get("/:id", [auth.getRole], service.getAdminRoleById)
router.get("/", [auth.getRole], service.getAllAdminRole)
router.put("/:id", [auth.getRole], service.updateRole)




module.exports = router