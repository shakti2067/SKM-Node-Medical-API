const validator = require("../../utils/validator")
const adminValidate = require("./admin.schema")


const controller = require("./admin.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")

exports.register = async (req, res) => {
    try {
        const response = await controller.register(req.body)
        if (response) {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            return res.status(200).send(
                common.sendErrorResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "amdin register"))
            )
        }
    } catch (error) {
        // console.log("Error in admin service:::", error)
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Error in Admin service - Register")
        )
    }
}