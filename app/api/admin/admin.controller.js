const AdminUser = require("../../models/admin.user.model")
const AdminLoginlogs = require("../../models/admin.login.logs.model")
const Role = require("../../models/adminRole.model")
const logger = require("../../utils/logger")
const util = require("util")
const mongoCommon = require("../mongoCommon/mongoCommon.controller")
const { default: mongoose } = require("mongoose")

const AdminOtp = require("../../models/adminUser.otp.model")
const mailer = require("../../utils/mailer")

exports.register = async (data) => {
    try {

        let { username, email } = data

        const existUserCheck = await AdminUser.findOne({
            email: email,
            isActive: true
        })
        if (!existUserCheck) {



            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
                throw new Error("Invalid Email")
            }

            let userRole = await Role.findOne({
                _id: data.role
            })
            // console.log("Role::", userRole)
            let user = {}

            user.username = data.username
            user.email = data.email
            user.password = data.password
            user.roleId = userRole._id
            user.role = userRole.title

            user = await AdminUser.create(user)

            let token = await user.SignToken()

            await user.encriptPassword(data.password)

            user = await user.save()

            let obj = {}
            obj.username = user.username
            obj.email = user.email
            obj.role = user.role

            return obj
        } else {
            return "User Already Register"
        }


    } catch (error) {
        // console.log("error in admin controller:::", error)
        logger.error(
            util.format("Error while Admin new Register %O", error)
        )
        throw new Error
    }
}

exports.adminLogin = async (data) => {
    try {
        let { username, password } = data
        let existUserCheck = await AdminUser.findOne({
            email: username,
            isActive: true,
            isDeleted: false
        })


        if (existUserCheck) {

            let passwordCheck = await existUserCheck.authenticate(password)

            if (passwordCheck) {

                let token = await existUserCheck.SignToken(existUserCheck._id, existUserCheck.role)

                let obj = {}
                obj.userId = existUserCheck._id
                obj.token = token

                let adminlogs = await AdminLoginlogs.create(obj)

                let user = {}
                user.username = existUserCheck.username
                user.role = existUserCheck.role
                user.email = existUserCheck.email
                user._id = existUserCheck._id
                user.token = token


                return user

            } else {
                return "Invalid Credentials"
            }

        } else {
            return "User not Register"
        }

    } catch (error) {
        logger.error(
            util.format("Error while Admin login %O", error)
        )
        throw new Error
    }
}

exports.getAdminModuleByRole = async (id) => {
    try {
        let isActive
        let query = {}

        if (global.isAdmin) {
            query._id = mongoose.Types.ObjectId(id)
            query.isActive = true
            query.isDeleted = false
        } else {
            query._id = mongoose.Types.ObjectId(id)
            query.isActive = true
            query.isDeleted = false
        }

        let aggregateQuery = [
            {
                '$match': query
            }, {
                '$sort': {
                    'title': 1
                }
            },
            {
                $lookup: {
                    from: "adminfeatures",
                    let: { "adminfeature": "$adminFeature" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $in: ["$_id", "$$adminfeature"]
                                        },
                                        {
                                            $eq: ["$parent_id", null]
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                key: 1,
                                url: 1,
                                is_Parent: 1,
                                parent_id: 1,
                                isActive: 1
                            }
                        },
                        {
                            $lookup: {
                                from: "adminfeatures",
                                let: { "parent_id": "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    {
                                                        $in: ["$_id", "$$adminfeature"]
                                                    },
                                                    {
                                                        $eq: ["$parent_id", "$$parent_id"] // first id is forign id and second is local id
                                                    }
                                                ]
                                            }
                                        }
                                    }, {
                                        $project: {
                                            _id: 1,
                                            title: 1,
                                            url: 1,
                                            is_Parent: 1,
                                            parent_id: 1,
                                            isActive: 1

                                        }
                                    }
                                ],
                                as: "child"
                            }
                        }
                    ],
                    as: "parent"
                }
            },
            {
                $project: {
                    parent: 1,
                    child: 1,
                    title: 1,
                    url: 1,
                    isActive: 1
                }
            }

        ]

        const result = await Role.aggregate(aggregateQuery)

        return result

    } catch (error) {
        // console.log("Inside catch:::", error)
        logger.error(
            util.format("Error while geting getAdminModuleByUser %O", error)
        )
        throw new Error
    }


}

exports.logout = async (id) => {
    try {
        let result = await AdminLoginlogs.updateMany({ userId: id }, { isActive: false, logoutStatus: "Logout" })
        return result
    } catch (error) {
        logger.error(
            util.format("Error while Admin logout %O", error)
        )
        throw new Error
    }
}

exports.changePassword = async (id, password) => {
    try {
        let checkUser = await AdminUser.findOne({ _id: id, isActive: true })

        if (checkUser) {
            // haspassword
            let haspassword = await checkUser.encriptPassword(password)

            //save password
            checkUser.haspassword = haspassword

            user = await checkUser.save()

            // token exipred
            await AdminLoginlogs.updateMany({ userId: checkUser._id }, { isActive: false, logoutStatus: "change_password" })

            if (user) {

                return "Password change successfully"

            } else {
                return false
            }

        } else {
            return "User not found"
        }
    } catch (error) {
        // console.log("error::", error)
        logger.error(
            util.format("Error while change password %O", error)
        )
        throw new Error
    }
}

exports.adminForgotPassword = async (email) => {
    try {
        let checkUser = await AdminUser.findOne({ email: email })

        if (checkUser) {
            let otp = Math.floor(Math.random() * 1000000)

            let checkOtp = await AdminOtp.findOne({ userId: checkUser._id, isActive: true })

            if (checkOtp) {
                checkOtp.otp = otp
                checkOtp.otpSendDate = new Date()

                let otpSave = await checkOtp.save()
            } else {
                otpObj = {
                    userId: checkUser,
                    otp: otp,
                    otpSendDate: new Date()
                }

                let opt = await AdminOtp.create(otpObj)
            }

            let mailObj = {
                to: checkUser.email,
                subject: "Verify Admin OTP",
                message: `Your Admin OTP is ${otp}`
            }
            mailer.sendMail(mailObj)

            return "Otp send successfully"

        } else {
            return "user not found"
        }

    } catch (error) {
        // console.log(error)
        logger.error(
            util.format("Error while forgot passowrd %O", error)
        )
        throw new Error(error)
    }
}