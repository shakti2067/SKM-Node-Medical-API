const controller = require("./category.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")

// get category
exports.getCategory = async (req, res) => {
    try {
        // console.log("req::", req.body)
        const response = await controller.getCategory()

        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        res.status(500).send(error.message || "internal server Error")
    }
}

// add Category
exports.addCategory = async (req, res) => {
    try {
        // console.log("req::", req.body)
        const file = req.file
        // console.log("file:::", file)

        let data = req.body

        data.image = file.path
        const response = await controller.addCategory(data)
        // console.log("response", response)
        if (response) {
            await controller.addChildInParentCategory(response.parentId, response._id)
        }

        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        // console.log("errror:::", error.message)
        res.status(500).send(
            common.sendErrorResponse(error.message || "internal server error")
        )
    }
}


exports.getParentCategory = async (req, res) => {
    try {
        const response = await controller.getParentCategory()

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "category"))
            )
        } else {
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Internal server Error")
        )
    }
}