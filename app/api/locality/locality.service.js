
const controller = require("./locality.controller")
const common = require("../../utils/common");
const constants = require("../../utils/constants");
const { response } = require("../user");

exports.addLocality = async (req, res) => {
    try {
        const data = req.body

        const response = await controller.addLocality(data)
        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response.locality)
        )
    } catch (error) {
        res.status(500).send(error.message || "Internal server Error")
    }
}