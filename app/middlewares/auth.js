const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")
const common = require("../utils/common")
const constants = require("../utils/constants")
const AdminUser = require("../models/admin.user.model")
const AdminLoginLogs = require("../models/admin.login.logs.model")
const mongoose = require("mongoose");

const User = mongoose.model("user")

exports.isAuthenticate = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        // console.log("token::", token)
        if (!token) {
            logger.warn("Request without token")

            return res.status(403).send(
                common.sendErrorResponse(constants.messageKeys.code_4004)
            )
        } else {
            const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRETE)
            // console.log("decode::", decode)

            req.user = decode

            var user = await User.findOne({
                _id: req.user._id
            })

            // console.log("user::", user)
            if (!user || !user.isActive || user.isDeleted || user.isBlock) {
                // Unauthorized
                res.status(401).send(
                    common.sendErrorResponse(constants.messageKeys.code_4001)
                )
            } else {
                next()

            }
        }



    } catch (error) {
        // console.log(error)
        res.status(500).send(error.message || "Internal server Error")
    }
}


exports.getRole = async (req, res, next) => {
    try {
        let token = req.headers["authorization"]
        if (!token) {
            logger.warn("Request without token")

            return res.status(403).send(
                common.sendErrorResponse(constants.messageKeys.code_4004)
            )
        } else {
            let decode = jwt.verify(token, process.env.JWT_TOKEN_SECRETE)

            req.user = decode

            if (req.user && req.user.role && req.user.role.toLowerCase() !== "user") {

                let adminLogs = await AdminLoginLogs.findOne({ token: token, isActive: true })
                // console.log("admin logs::::", adminLogs)

                if (adminLogs) {
                    global.isAdmin = true
                    next()
                } else {
                    return res.status(401).send(
                        common.sendErrorResponse("Unauthorised user")
                    )
                }

            } else {
                global.isAdmin = false
                next()
            }

        }
    } catch (error) {
        return res.status(500).send(
            common.sendErrorResponse(error.message || "Internal server error")
        )
    }
}