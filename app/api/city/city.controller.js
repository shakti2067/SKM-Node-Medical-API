const mongo = require("../mongoCommon/mongoCommon.controller")
const { City } = require("../../models/city.model");
const logger = require("../../utils/logger");
const util = require("util")


exports.addCity = async (data) => {
    try {
        // console.log("data", data)
        const result = await mongo.addDocuments("city", data)
        // console.log("result::", result)
        return result;
    } catch (error) {
        logger.error(
            util.format("Error while adding document to city %O", error)
        )
    }
    throw error
}

exports.getAllCity = async () => {
    try {
        let query;
        query = {
            isActive: true,
            isDeleted: false
        }
        const result = await City.find(query)
            .populate({
                path: "state",
                select: { _id: 0, title: 1 }
            })
            // .populate({
            //     path: "country",
            //     select: { _id: 0, title: 1 }
            // })
            .sort({ title: 1 })
        // console.log("resutl", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while getting document from city %O", error)
        )
        throw error
    }
}

exports.listing = async (data) => {
    try {

        let query = {
            isDeleted: false
        }

        if (data.search == "inactive") {
            query = {
                ...query,
                isActive: false,

            }
        } else if (data.search == "active") {
            query = {
                ...query,
                isActive: true
            }
        } else if (data.search) {
            query = {
                ...query,
                title: { $regex: new RegExp(data.search), $options: "i" }
            }
        }

        if (data.stateId) {
            query = {
                ...query,
                state: data.stateId
            }
        }
        // console.log("query", query)

        const result = await City.find(query).select("title key isActive isDeleted")
        // console.log("result::", result)
        return result
    } catch (error) {
        logger.error(
            util.format("error while geting city %O", error)
        )
    }
}