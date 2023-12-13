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

exports.getBrandByCategoryId = async (id) => {
    try {
        let query = {}
        if (global.isAdmin) {
            query.isActive = true
            query._id = id

        } else {
            query.isActive = true
            query.isDeleted = false
            query._id = id
        }

        const result = await Brand.find(
            { category: id },
            {
                _id: 1,
                title: 1,
                category: 1,
                isActive: 1,
                isDeleted: 1
            })

        return result
    } catch (error) {
        // console.log("error::", error)
        logger.error(
            util.format("Error while geting Brand By Category %O", error)
        )
        throw error
    }
}

exports.updateBrand = async (id, doc) => {
    try {
        const result = await mongo.updateDocuments("brand", id, doc)
        console.log("result::", result)
        return result
    } catch (error) {
        console.log("error::", error)
    }
}