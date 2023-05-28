const Country = require("../../models/country.model")
const logger = require("../../utils/logger")
const util = require("util")
const mongo = require("../mongoCommon/mongoCommon.controller")

exports.addCountry = async (data) => {
    try {
        const newData = new Country(data)

        const result = await newData.save()
        // console.log("result", result)
        return result
    } catch (error) {
        // console.log("Error in contry controller", error)
        logger.error(
            util.format("Error while adding document to Country", error)
        )
        throw error
    }
}

exports.getAllCountry = async () => {
    try {

        let query;
        query = {
            isActive: true,
            isDeleted: false
        }
        const result = await mongo.getAllDocuments("country", query)
        // console.log("result ::", result)
        return result

    } catch (error) {
        // console.log("Error in Country controller:::", error)
        logger.error(
            util.format("Error while getting to all County", error)
        )
        throw error
    }
}

exports.getCountryById = async (id) => {
    try {

        const result = await mongo.getDocumentById("country", id)
        // console.log("result::", result)
        return result
    } catch (error) {
        // console.log("Error in Country controller", error)
        logger.error(
            util.format("Error while Getting Document to Country By id %O", error)
        )
        throw error
    }
}

exports.updateCountry = async (id, data) => {
    try {

        const result = await mongo.updateDocuments("country", id, data)
        // console.log("result::", result)
        return result



    } catch (error) {
        // console.log("Error in country controller", error)
        logger.error(
            util.format("Error Occured while updating Country", error)
        )
        throw error
    }
}

exports.softDeleteById = async (id) => {
    try {

        let query = {
            isActive: false,
            isDeleted: true
        }

        // const doc = await Country.findById({ _id: id })

        const result = await mongo.updateDocuments('country', id, query)
        return result


    } catch (error) {
        // console.log("Error in country controller", error)
        logger.error(
            util.format("Error while updating doument Country by id %O", error)
        )
    }
}