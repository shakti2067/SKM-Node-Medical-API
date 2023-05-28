
const common = require("../mongoCommon/mongoCommon.controller")
const Feature = require("../../models/adminFeature.model")
const logger = require("../../utils/logger")
const util = require("util")

exports.addFeature = async (data) => {
    try {

        return await common.addDocuments("adminFeature", data)


    } catch (error) {
        // console.log("err in adminFeature contoroller::", error)
        logger.error(
            util.format("Error while adding document to adminFeature %0", error)
        )
    }
}

exports.getAdminFeature = async () => {
    try {
        return await common.getAllDocuments("adminFeature")
    } catch (error) {
        logger.error(
            util.format("Error while getting document to adminFeature %0", error)
        )
    }
}

exports.updateAdminFeature = async (id, data) => {
    try {
        return await common.updateDocuments("adminFeature", id, data)
    } catch (error) {
        logger.error(
            util.format("Error while updating AdminFeature documents %0", error)
        )
    }
}

exports.DeleteAdminFeature = async (id) => {
    try {
        let query = {
            isActive: false,
            isDeleted: true
        }

        return await common.updateDocuments("adminFeature", id, query)

    } catch (error) {
        logger.error(
            util.format("Error while updating AdminFeature documents %0", error)
        )
    }
}