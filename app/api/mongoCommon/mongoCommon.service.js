
const mongoose = require('mongoose')
const common = require("../../utils/common")
const contants = require("../../utils/constants")
const controller = require("./mongoCommon.controller")



exports.getAllDocuments = async (req, res) => {

    try {
        const model = req.params.collection;
        console.log("model::", model)

        const response = await controller.getAllDocuments(model)


        if (!response) {
            res.status(200).send(common.sendMessageResponse(contants.systemMsg.GetErrorMsg.replace("{0}", "documents")))
        }
        res.status(200).send(common.sendSucessResponse(contants.msg.code_2000, response))


    } catch (error) {
        res.status(500).send(common.sendErrorResponse(error.message || "Internal Server Error"))

    }


}


exports.addDocuments = async (model, doc) => {
    try {

        const response = await controller.addDocuments(model, doc)

        if (!response) {
            return res.status(200).send(common.sendMessageResponse(contants.systemMsg.SaveErrorMsg.replace("{0}", "document")))
        } else {
            res.status(200).send(common.sendSucessResponse(contants.messageKeys.code_2000, response))
        }

    } catch (error) {
        // console.log(error)
        res.status(500).send(common.sendErrorResponse(error.message || "Internal Server Error"))
    }



}
