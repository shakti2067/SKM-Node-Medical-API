
const AdminUser = require("../../models/admin.model")
const Adminlogs = require("../../models/admin.login.logs.model")
const Role = require("../../models/adminRole.model")
const logger = require("../../utils/logger")
const util = require("util")

exports.register = async (data) => {
    try {
        console.log("data:", data)
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
            console.log("Role::", userRole)
            let user = {}

            user.username = data.username
            user.email = data.email
            user.password = data.password
            user.roleId = userRole._id
            user.role = userRole.title

            user = await AdminUser.create(user)

            let token = await user.SignToken()

            await user.encriptPassword(data.password)


            let adminlogsObj = {
                userId: user._id,
                token: token,
            }

            let adminLog = await Adminlogs.create(adminlogsObj)


            user = await user.save()

            delete user.hashPassword
            delete user.password
            delete user.salt

            return user
        } else {
            return "User Already Register"
        }


    } catch (error) {
        // console.log("error in admin controller:::", error)
        logger.error(
            util.format("Error while Admin new Register %O", error)
        )
    }
}