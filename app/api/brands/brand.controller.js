const mongoose = require("mongoose")

const Brand = require("../../models/brand.model")
const logger = require("../../utils/logger")
const util = require("util")
const mongo = require("../mongoCommon/mongoCommon.controller")


exports.addBrand = async (data) => {
    try {
        const result = await mongo.addDocuments("brand", data)
        // console.log("result::", result)
        return result
    } catch (error) {
        logger.error(
            util.format("error while adding brand doc %O", error)
        )
        throw error
    }
}