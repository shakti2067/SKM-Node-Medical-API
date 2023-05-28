const validator = require("../../utils/validator")
const adminValidate = require("./admin.schema")


const controller = require("./admin.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")
const { response } = require("express")

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

exports.adminLogin = async (req, res) => {
    try {
        let response = await controller.adminLogin(req.body)
        if (!response) {
            res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "Admin user"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(error.message || "Internal Error in Admin login")
        )
    }
}

exports.getAdminModuleByUser = async (req, res) => {
    try {
        const id = req.user._id
        let response = await controller.getAdminModuleByUser(id)

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "module"))
            )
        } else {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Error on getAdminModuleByUser api service ")
        )
    }
}

exports.logout = async (req, res) => {
    try {
        const id = req.user._id
        const response = await controller.logout(id)

        return res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, "Logout sucessfully")
        )
    } catch (error) {
        // console.log(error)
        return res.status(500).send(error.message || "Error in logout admin.service")
    }
}