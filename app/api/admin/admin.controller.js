
const AdminUser = require("../../models/admin.user.model")
const AdminLoginlogs = require("../../models/admin.login.logs.model")
const Role = require("../../models/adminRole.model")
const logger = require("../../utils/logger")
const util = require("util")
const mongoCommon = require("../mongoCommon/mongoCommon.controller")
const { default: mongoose } = require("mongoose")

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

exports.getAdminModuleByUser = async (id) => {
    try {

        let isActive
        let query = {}

        if (global.isAdmin) {
            query._id = mongoose.Types.ObjectId(id)
            query.isActive = true
        } else {
            query._id = mongoose.Types.ObjectId(id)
            query.isActive = true
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
                '$lookup': {
                    'from': 'adminroles',
                    'localField': 'roleId',
                    'foreignField': '_id',
                    'as': 'roleName'
                }
            },
            {
                '$lookup': {
                    'from': 'adminfeatures',
                    'localField': 'roleName.adminFeature',
                    'foreignField': '_id',
                    'as': 'adminfeaturesName'
                }
            },
            {
                '$project': {
                    // 'username': 1,
                    'module': '$adminfeaturesName.title',
                    'url': '$adminfeaturesName.url',
                    'isActive': 1,
                    'isDeleted': 1,
                    'createdDate': 1,
                    'updatedDate': 1
                }
            }
        ]


        const result = await AdminUser.aggregate(aggregateQuery)

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