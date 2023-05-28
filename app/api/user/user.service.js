const controller = require("./user.controller")
const common = require("../../utils/common")
const constants = require("../../utils/constants")

const userValidation = require("../user/user.schema")
const validator = require("../../utils/validator")


exports.getUserById = (req, res) => {
    console.log("req::", req.params.id)
}

exports.register = async (req, res) => {
    try {
        const data = req.body
        let response = await validator(data, userValidation.register)
        // console.log("response:::", response)

        if (response.isError) {
            return res.status(403).send(
                common.sendErrorResponse(response)
            )
        } else {
            response = await controller.register(data)
        }

        if (!response) {
            return res.status(200).send(
                common.sendMessageResponse(constants.systemMsg.SaveErrorMsg.replace("{0}", "user"))
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        // console.log("Error in servive", error)
        res.status(500).send(error.message || "Internal Sever Error")
    }
}

// Login Initiate
exports.loginInitiate = async (req, res) => {
    try {
        // console.log("req check", req.body)
        const response = await controller.loginInitiate(req.body)
        if (response == "Invalid Email Address") {
            return res.status(500).send(
                common.sendErrorResponse(response || constants.messageKeys.code_5001)
            )
        }
        res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5000))
    }
}
// OTP verify
exports.verifyOtp = async (req, res) => {
    try {
        // console.log(req.body)
        const response = await controller.verifyOtp(req.body)
        // console.log("response:::", response)
        if (response) {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        // console.log("error in user service::", error)
        res.status(500).send(error.message)
    }
}
// send Otp
exports.sendOtp = async (req, res) => {
    try {

        const response = await controller.sendOtp(req.body)
        // console.log("res:::", response)
        if (response === "user not register") {
            res.status(500).send(
                common.sendErrorResponse(constants.messageKeys.code_5002)
            )
        } else {
            res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }
    } catch (error) {
        res.status(5000).send(constants.messageKeys.code_5000 || error.message)
    }
}

exports.login = async (req, res) => {
    try {
        // console.log("data:::", req.body)
        let data = req.body

        let response = await validator(data, userValidation.login)
        // console.log("res::", response)
        if (response.isError) {
            return res.status(403).send(
                common.sendErrorResponse(response)
            )
        } else {
            response = await controller.login(data)
            // console.log("res:::", response)
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, response)
            )
        }

    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Internal Server Error")
        )
    }
}

exports.getUserByToken = async (req, res) => {
    try {
        const data = req.user._id
        // console.log("data:::", data)
        const response = await controller.getUserByToken(data)
        // console.log("res::", response)
        return res.status(200).send(
            common.sendSucessResponse(constants.messageKeys.code_2000, response)
        )
    } catch (error) {
        // console.log("error in user service:::", error)
        return res.status(500).send(
            common.sendErrorResponse(error.message || "internal server Error")
        )

    }
}

exports.userLogOut = async (req, res) => {
    try {
        const data = req.headers["authorization"]

        let response = await controller.checkToken(data)
        // console.log("token::", checkToken)
        if (!response) {
            return res.status(500).send(
                common.sendErrorResponse(constants.systemMsg.TokenError.replace("{0}", "user"))
            )
        } else {
            response = await controller.userLogOut(data)
            // console.log("response:::", response)
            return res.status(200).send(
                common.sendSucessResponse(constants.messageKeys.code_2000, "User Logout")
            )
        }

    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "internal server Error")
        )
    }
}