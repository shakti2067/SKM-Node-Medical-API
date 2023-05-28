const express = require("express");
const router = express.Router()

const service = require("./country.service")
const auth = require("../../middlewares/auth")



router.post("/", [auth.isAuthenticate], service.addCountry);
router.get("/", [auth.isAuthenticate], service.getAllCountry)
router.get("/:id", service.getCountryById)
router.put("/:id", [auth.isAuthenticate], service.updateCountry)
router.delete("/:id", [auth.isAuthenticate], service.softDeleteById)



module.exports = router