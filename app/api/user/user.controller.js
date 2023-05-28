const User = require("../../models/user.model")

const logger = require("../../utils/logger")
const util = require("util")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")


const otpModel = require("../../models/user.otp.model")
const mailer = require('../../utils/mailer')
const { path } = require(".")




exports.register = async (data) => {
    try {
        // console.log("data", data)


        let checkUser = await User.find({ $or: [{ email: data.email }, { mobileNumber: data.mobileNumber }] })
        // console.log("checkUser::", checkUser)

        if (checkUser.length != 0) {
            // console.log(" register")
            throw new Error("User already register")

        } else {
            let email
            if (data.email) {
                if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
                    email = 1
                }
                if (email == 1) {
                    throw new Error("Invalid email")
                }
            }
            if (!data.password.trim()) {
                throw new Error("Space is not allowed")
            }


            let user = await User.create(data)
            // console.log("user", user._id)

            const token = user.signToken(user.username)
            // console.log("token::", token)

            const encryptPassword = await user.encryptPassword(data.password)
            // console.log("encryptPassword:::", encryptPassword)

            user.token = token
            // user.hashPassword = encryptPassword

            let result = await user.save()
            // console.log("user", result)

            // Remove token and password from response


            let res = {
                username: result.username,
                email: result.email,
                profilePicture: result.profilePicture,
                _id: result._id
            }

            return res

            // console.log("resutl", res)
        }

    } catch (error) {
        // console.log("Error in controller", error)
        logger.error(
            util.format("Error while adding Document to user %O", error)
        )
        throw error
    }
}


exports.loginInitiate = async data => {
    try {
        const { login_type } = data
        const { username } = data
        // console.log("data", data)

        if (login_type == "email") {
            let email
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.username)) {
                email = 1;
            }
            if (email == 1) {
                return "Invalid Email Address"
            }
            const existUserCheck = await User.findOne({
                email: username,
                isDeleted: false
            })
            // console.log("exist user", existUserCheck)

            if (existUserCheck) {
                if (!existUserCheck.isEmailVerified || !existUserCheck.isActive) {
                    await addUserAndUpdateOtpDoc(existUserCheck, "email")
                }
                return {
                    email: existUserCheck.email,
                    isEmailVerified: existUserCheck.isActive ? existUserCheck.isEmailVerified : false,
                    id: existUserCheck._id
                }
            } else {
                const newuser = {
                    email: username,
                    isActive: false
                }
                // console.log("new user::", newuser)
                const insertUser = await User(newuser).save()
                // console.log("insert", insertUser)
                if (!insertUser) {
                    throw new Error("User not register")
                } else {
                    await addUserAndUpdateOtpDoc(insertUser, "email")
                    return {
                        username: insertUser.email,
                        id: insertUser._id,
                        isEmailVerified: insertUser.isEmailVerified
                    }
                }



            }


        } else {
            console.log("User login with mobile")
        }
    } catch (error) {
        console.log("error in user controller:", error)
    }
}


const addUserAndUpdateOtpDoc = async (data, sendTo) => {
    try {
        // console.log(data)
        let otpDoc;
        let newOtpDoc

        const otp = parseInt(Math.floor(Math.random() * 1000000))
        // console.log("otp::", otp)

        otpDoc = await otpModel.findOne({
            userId: data._id
        })
        // console.log("otp check", otpDoc)

        // check otp exist or not
        if (otpDoc) {
            otpDoc.otp = otp,
                otpSendDate = new Date()
            newOtpDoc = await otpDoc.save()
        } else {
            otpDoc = {
                userId: data._id,
                otp: otp,
                otpSendDate: new Date()
            }
            // console.log(otpDoc)

            newOtpDoc = await otpModel(otpDoc).save()

        }
        // console.log("newOtpDoc", data.email)

        if (sendTo == "email") {
            let mailData = {}

            mailData.to = data.email
            mailData.subject = "Verify Your email"
            mailData.message = `Your 6 digit otp is : ` + otp

            const emailResult = await mailer.sendMail(mailData)
            // console.log("email::", emailResult.accepted)
            return emailResult
            // console.log("otp send to mail")
        }

    } catch (error) {
        logger.error(
            util.format("Error while send otp %O", error)
        )
        throw error
    }
}


exports.verifyOtp = async (data) => {
    try {

        const otpDoc = await otpModel.findOne({ otp: data.otp })
        console.log("check user::", otpDoc)
        if (!otpDoc) {
            return "otp is invalid"
        }

        let now = new Date()
        // console.log("now", now)
        let end = new Date(otpDoc.otpSendDate)
        // console.log("end", end)
        let duration = Math.round((((now - end) % 86400000)) % 3600000) / 60000
        // console.log("duration ::", duration)
        // console.log("duration", Math.abs(duration))
        // if (Math.abs(duration) > 10) {
        //     return "Otp Expired"
        // }

        if (otpDoc.otp === data.otp) {
            const userDoc = await User.findById({ _id: otpDoc.userId })
            userDoc.isEmailVerified = true
            userDoc.isActive = true
            // console.log("user", userDoc)

            const newUser = await userDoc.save()
            console.log(newUser)
            return {
                isEmailVerified: userDoc.isEmailVerified
            }
        }
    } catch (error) {
        logger.error(
            util.format("Error while verify otp %O", error)
        )
        throw error
    }
}

exports.sendOtp = async (data) => {
    try {
        let query
        query = {
            $and: [
                {
                    $or: [
                        { mobileNumber: data.username },
                        { email: data.username }
                    ]
                },
                { isActive: true, },
                { isDeleted: false }
            ]

        }

        const foundUser = await User.findOne(query)
        // console.log("found user::", foundUser)
        if (!foundUser || foundUser.length == 0) {
            return "user not register"
        } else {
            const otp = await addUserAndUpdateOtpDoc(foundUser, "email")
            // console.log("sendotp::", otp)
            if (otp) {
                return {
                    email: foundUser.email,
                    id: foundUser._id,
                    isActive: foundUser.isActive
                }
            } else {
                return "otp not send"
            }
        }
    } catch (error) {
        logger.error(
            util.format("error while sending otp %O", error)
        )
        throw error
    }
}

exports.login = async (data) => {
    try {
        let query

        const { username } = data
        const { password } = data

        query = {
            $or: [
                { email: username },
                { mobileNumber: username }
            ],
            isDeleted: false
        }

        const findUser = await User.findOne(query)
        // console.log("finduser:::", findUser)

        if (!findUser) {
            return "Invalid Credential"
        }

        let passwordCheck = await findUser.authenticate(password, findUser.hashPassword)
        if (!passwordCheck || passwordCheck.length <= 0) {
            return "Invalid Credential"

        } else if (findUser.isBlock) {
            return "User Block by admin"

        } else if (findUser.isActive == false) {
            await User.updateMany({ _id: findUser._id }, { isActive: true, isLogout: false })

        }

        const token = findUser.signToken(findUser._id)
        // console.log("token:::", token)

        findUser.jwtToken = token

        await findUser.save()

        let res = {
            username: findUser.username,
            email: findUser.email,
            mobile: findUser.mobileNumber,
            _id: findUser._id,
            token: findUser.jwtToken
        }

        return res

    } catch (error) {
        // console.log("error:::", error)
        logger.error(
            util.format("Error while getting login user %O", error)
        )
    }
}

exports.getUserByToken = async data => {
    try {
        // console.log("data:::", data)
        const existingUser = await User.findOne(
            {
                _id: data
            },
            {
                _id: 1,
                username: 1,
                email: 1,
                profilePicture: 1,
                mobileNumber: 1,
                isActive: 1,
                isDeleted: 1,
                isBlock: 1,
                state: 1,
                city: 1,
                jwtToken: 1
            }
        ).populate([
            {
                path: "state",
                match: {
                    isActive: true
                },
                select: "title _id"

            },
            {
                path: "city",
                match: {
                    isActive: true
                },
                select: "title _id"
            }
        ]

        )
        // console.log("existing user:::", existingUser)

        return existingUser
    } catch (error) {
        // console.log("error in user controller:::", error)
        logger.error(
            util.format("Error while getting token by user %O", error)
        )
    }
}


exports.checkToken = async (data) => {
    try {
        const result = await User.findOne({ jwtToken: data })
        // console.log("res:::", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while getting user token %O", error)
        )
    }
}
exports.userLogOut = async data => {
    try {
        const result = await User.updateOne(
            {
                jwtToken: data
            },
            {
                isActive: false,
                isLogout: true
            })

        return result
    } catch (error) {
        logger.error(
            util.format("Error while user Logout %O", error)
        )
    }
}