const express = require("express");
const router = express.Router()

const service = require("./state.service")
const auth = require("../../middlewares/auth")



router.post('/', [auth.isAuthenticate], service.addState)
router.get("/", service.getState)
router.get("/:id", service.getStateById)
router.get("/country/:id", service.getStateByCountry)
router.put("/:id", [auth.isAuthenticate], service.updateState)
router.delete("/:id", [auth.isAuthenticate], service.softDeleteStateById)


module.exports = router