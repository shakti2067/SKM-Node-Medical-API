const { City, Locality } = require("../../models/city.model")
const logger = require("../../utils/logger")
const util = require("util")



exports.addLocality = async (data) => {
    try {
        // console.log("data", data)
        const locality = {
            title: data.title,
            type: data.type
        }
        const id = data.city

        const city = await City.findById({ _id: id })

        if (city) {
            city.locality.push(locality)
            const result = await city.save()
            // console.log("newcity", result)
            return result
        } else {
            throw Error("City not found")
        }
    } catch (error) {
        logger.error(
            util.format("Error while adding Locality %O", error)
        )
        throw error
    }
}