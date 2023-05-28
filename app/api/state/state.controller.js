
const mongo = require("../../api/mongoCommon/mongoCommon.controller")
const State = require("../../models/state.model")
const logger = require("../../utils/logger")
const util = require("util")
const { query } = require("winston")

exports.addState = async (data) => {
    try {
        // console.log("data", data)
        const result = await mongo.addDocuments("state", data)
        // console.log("result::", result)

        return result


    } catch (error) {
        // console.log("Error in state controller", error)
        logger.error(
            util.format("Error while adding document to state %O", error)
        )
        throw error
    }
}

exports.getState = async () => {
    try {
        let query;
        query = {
            isActive: true,
            isDeleted: false
        }
        // const result = await mongo.getAllDocuments("state", query)
        const result = await State.find({}).populate({
            path: "country",
            select: "title code "
        }
        )
        // console.log("result", result)
        return result

    } catch (error) {
        // console.log("error in state controller", error)
        logger.error(
            util.format("Error while getting doucument by id %O", error)
        )
        throw error
    }
}

exports.getStateById = async (id) => {
    try {
        // const result = await mongo.getDocumentById("state", id)
        const result = await State.findById({ _id: id }).populate({
            path: "country",
            select: "title code"
        })
        // console.log("result::", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while getting document by id %O", error)
        )
        throw error
    }
}

exports.updateState = async (id, data) => {
    try {

        const result = await mongo.updateDocuments("state", id, data)
        // console.log("result::", result)
        return result

    } catch (error) {
        // console.log("error in state controller", error)
        logger.error(
            util.format("Error while updating doucument by id %O", error)
        )
        throw error
    }

}

exports.softDeleteStateById = async (id) => {
    try {

        let query;
        query = {
            isActive: false,
            isDeleted: true
        }
        const result = await mongo.updateDocuments("state", id, query)
        // console.log("result", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while deleting State %O", error)
        )
        throw error
    }

}

exports.getStateByCountry = async (id) => {
    try {
        let query;
        query = {
            country: id,
            isActive: true,
            isDeleted: false
        }
        const result = await State.find(query).populate({
            path: "country",
            select: "title isActive isDeleted"
        })
        // console.log("result:", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while getting doument from state %O", error)
        )
        throw error
    }

}