const controller = require("./adminRole.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")



exports.addAdminRole = async (req, res) => {
    try {
        const response = await controller.addAdminRole(req.body)
        // console.log("repsponse ::::", response)
        if (response) {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            return res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "admin role"))
            )
        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error || "Internal server Error")
        )
    }
}

exports.getAdminRoleById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await controller.getAdminRoleById(id)
        // console.log("res::::", response)

        if (response) {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            return res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "admin role"))
            )
        }

    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error || "Internal server Error")
        )
    }
}

exports.getAllAdminRole = async (req, res) => {
    try {
        const response = await controller.getAllAdminRole()
        if (response) {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        } else {
            return res.status(404).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "admin role"))
            )
        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Internal server Error")
        )
    }
}