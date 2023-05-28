const express = require("express")
const router = express.Router()
const service = require("./adminFeature.service")

router.post("/", service.addFeature)
router.get("/", service.getAdminFeature)
router.put("/:id", service.updateAdminFeature)
router.delete("/:id", service.DeleteAdminFeature)




module.exports = router