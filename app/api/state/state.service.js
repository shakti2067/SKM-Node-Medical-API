
const controller = require("./state.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")


//Add document
exports.addState = async (req, res) => {
    try {
        const state = req.body
        const response = await controller.addState(state)

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "state"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        // console.log("Error in state service", error)
        res.status(500).send(error.message || "Internal server Error")
    }
}

// Get All state
exports.getState = async (req, res) => {
    try {
        const response = await controller.getState()
        // console.log("state::", response)
        if (!response) {
            return res.status(200).send(
                common.sendErrorResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "State"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        // console.log("error in state service", error)
        res.status(500).send(error.message || "Internal server Error")
    }
}

// get State by id
exports.getStateById = async (req, res) => {
    try {
        const id = req.params.id
        // console.log("id", id)
        const response = await controller.getStateById(id)
        if (!response) {
            res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "state"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        res.status(500).send(error.message || "Internal Server Error")
    }
}

// Update state
exports.updateState = async (req, res) => {
    try {
        const id = req.params.id
        const state = req.body
        // console.log(id, state)
        const response = await controller.updateState(id, state)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.UpdateErrorMsg.replace("{0}", "state"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        // console.log("error in state service", error)
        res.status(500).send(error.message || "Internal server Error")
    }
}

// Soft delete state by id
exports.softDeleteStateById = async (req, res) => {
    try {
        const id = req.params.id
        // console.log("id", id)

        const response = await controller.softDeleteStateById(id)
        // console.log("res", response)
        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.DeleteErrorMsg.replace("{0}", "state"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        // console.log("error in state service", error)
        res.status(500).send(error.message || "Internal server Errror")
    }
}

// get state by country
exports.getStateByCountry = async (req, res) => {
    try {
        const id = req.params.id
        // console.log("id", id)
        const response = await controller.getStateByCountry(id)
        if (!response) {
            res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.GetErrorMsg.replace("{0}", "state"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        req.status(500).send(error.message || "Internal server Error")
    }
}