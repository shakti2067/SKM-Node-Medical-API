
const controller = require('./product.controller')

const common = require("../../utils/common")
const constant = require("../../utils/constants")

exports.addProduct = async (req, res) => {
    try {
        let data = req.body
        let file = req.file
        // console.log("file:::", file)

        data.image = file.path
        const response = await controller.addProduct(data)

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constant.systemMsg.SaveErrorMsg.replace("{0}", "product"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constant.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(constant.messageKeys.code_5000, error.message)
        )
    }
}

exports.getProduct = async (req, res) => {
    try {
        let pageNumber, pageSize

        pageNumber = req.body.pageNumber
        pageSize = req.body.pageSize

        const response = await controller.getProduct(pageSize, pageNumber)
        // console.log("res::", response)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constant.systemMsg.GetErrorMsg.replace("{0]", "product"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constant.messageKeys.code_2000, response.result, response.total_count)
            )
        }
    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(constant.messageKeys.code_5000, error.message)
        )
    }
}

exports.getProductByCategory = async (req, res) => {
    try {
        const id = req.params.categoryId

        let pageNumber = req.body.pageNumber
        let pageSize = req.body.pageSize

        // console.log("parms::", id)
        const response = await controller.getProductByCategory(id, pageNumber, pageSize)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constant.systemMsg.GetErrorMsg.replace("{0}", "product"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constant.messageKeys.code_2000, response.result, response.total_count)
            )
        }
    } catch (error) {
        res.status(500).send(
            common.sendErrorResponse(error.message || "Internal server Error")
        )
    }
}