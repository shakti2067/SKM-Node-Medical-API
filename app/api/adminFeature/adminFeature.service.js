const controller = require("./adminFeature.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")

exports.addFeature = async (req, res) => {
    try {

        // console.log("body::", req.body)
        let response = await controller.addFeature(req.body)
        // console.log("res:::", response)
        if (response) {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "admin Feature"))
            )
        }
    } catch (error) {
        // console.log("Error in Feature controller::::", error)
        res.status(500).send(
            common.sendErrorResponse(error || "Internal server Error")
        )
    }
}


exports.getAdminFeature = async (req, res) => {
    try {
        const response = await controller.getAdminFeature()
        // console.log("response:::", response)
        if (response) {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "admin Fetature"))
            )
        }
    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(error || "Internal server Error")
        )
    }
}

exports.updateAdminFeature = async (req, res) => {
    try {
        let id = req.params.id
        const response = await controller.updateAdminFeature(id, req.body)
        // console.log("response:::", response)

        if (response) {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.UpdateErrorMsg.replace("{0}", "admin Feature"))
            )
        }
    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(error || "Internal server Error")
        )
    }
}


exports.DeleteAdminFeature = async (req, res) => {
    try {
        let id = req.params.id
        const response = await controller.DeleteAdminFeature(id)
        // console.log("response:::", response)

        if (response) {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.DeleteErrorMsg.replace("{0}", "admin feature"))
            )
        }
    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(error || "Internal server Error")
        )
    }
}