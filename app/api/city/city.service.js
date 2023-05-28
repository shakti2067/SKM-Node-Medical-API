const controller = require('./city.controller')
const common = require("../../utils/common");
const constants = require("../../utils/constants")

exports.addCity = async (req, res) => {
    try {
        const data = req.body
        const response = await controller.addCity(data)
        if (!response) {
            res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "state"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        res.status(500).send(error.message || "Internal server Error")
    }
}
// get All City
exports.getAllCity = async (req, res) => {
    try {
        const response = await controller.getAllCity()
        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        res.status(500).send(error.message || "Internal server Error")
    }
}

// get city listing
exports.listing = async (req, res) => {
    try {

        const response = await controller.listing(req.body)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg)
            )
        }

        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        res.status(500).send(error.message || "internal server Error")
    }
}