
const Role = require("../../models/adminRole.model")
const common = require("../mongoCommon/mongoCommon.controller")
const logger = require("../../utils/logger")
const util = require("util")


exports.addAdminRole = async (role) => {
    try {
        return await common.addDocuments("adminRole", role)
    } catch (error) {
        // console.log("error in role controller::::", error)
        logger.error(
            util.format("Error while adding AdminRole documents %O", error)
        )
    }
}


exports.getAdminRoleById = async (id) => {
    try {
        const result = await Role.findOne({ _id: id })
        // console.log("result::", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while getting AdminRole documents %O", error)
        )
    }
}

exports.getAllAdminRole = async () => {
    try {
        let query = {
            isActive: true,
            isDeleted: false
        }

        return await common.getAllDocuments("adminRole", query)

    } catch (error) {
        logger.error(
            util.format("Error while getting All AdminRole documents %O", error)
        )
    }
}