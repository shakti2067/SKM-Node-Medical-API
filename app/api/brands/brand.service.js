
const controller = require("./brand.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")
const brandValidate = require("./brand.schema")
const validator = require("../../utils/validator")

exports.addBrand = async (req, res) => {
    try {

        const data = req.body
        const validateData = await validator(data, brandValidate.brand)
        // console.log("result ::::", result)
        if (validateData.isError) {
            return res.status(403).send(
                common.sendErrorResponse(validateData.message)
            )
        }

        const response = await controller.addBrand(validateData.value)

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "brand"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(constants.messageKeys.code_5000, error.message)
        )
    }
}

exports.getBrandByCategoryId = async (req, res) => {
    try {
        const id = req.params.categoryId
        const response = await controller.getBrandByCategoryId(id)

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "Brand"))
            )
        } else {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        // console.log("error::", error)
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Error in  getBrandByCategoryId - service")
        )
    }
}

exports.updateBrand = async (req, res) => {
    try {
        const id = req.params.id
        const response = await controller.updateBrand(id, req.body)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.UpdateErrorMsg.replace("{0}", "Brand"))
            )
        } else {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        // console.log(error)
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Error in  getBrandByCategoryId - service")
        )
    }
}