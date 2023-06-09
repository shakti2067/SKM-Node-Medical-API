
const service = require("./productForm.service")
const common = require("../../utils/common")
const constants = require("../../utils/constants")

exports.addProductForm = async (req, res) => {
    try {
        const response = await service.addProductForm(req.body)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "product form"))
            )
        } else {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Error in addProductForm function controller ")
        )
    }
}


exports.getProductForm = async (req, res) => {
    try {
        const response = await service.getProductForm()
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "product form"))
            )
        } else {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Error in addProductForm function controller ")
        )
    }
}