const controller = require("./country.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")

// Add Country
exports.addCountry = async (req, res) => {
    try {
        const data = req.body

        const response = await controller.addCountry(data)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "Country"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        // console.log("error in country service", error)
        res.status(500).send(error.message || "Internal Sever Error")
    }
}

// Get All Country
exports.getAllCountry = async (req, res) => {
    try {
        const response = await controller.getAllCountry()

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "Country"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }


    } catch (error) {
        // console.log("Error in Contry service", error)
        res.status(500).send(error.message || "Internal Server Error")
    }
}

//Get Country By id
exports.getCountryById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await controller.getCountryById(id)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "Country"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch {
        // console.log("Error in country service", error)
        res.status(500).send(error.message || "Internal server Error")
    }
}

// update Country by id
exports.updateCountry = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body

        const response = await controller.updateCountry(id, data)

        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        // console.log("Error in country service", error)
        res.status(500).send(error.message || constants.systemMsg.InternalServerError)
    }
}

// Soft Delete country
exports.softDeleteById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await controller.softDeleteById(id)

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "Country"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        // console.log("Error in country service", error)
        res.status(500).send(error.message || constants.systemMsg.InternalServerError)
    }
}