const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")
const common = require("../utils/common")
const constants = require("../utils/constants")

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