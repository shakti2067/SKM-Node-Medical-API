
const Productform = require("../../models/productForm.model")
const mongoCommon = require("../mongoCommon/mongoCommon.controller")
const logger = require("../../utils/logger")
const util = require("util");


exports.addProductForm = async (doc) => {
    try {
        const result = await mongoCommon.addDocuments("productForm", doc)
        return result
        // console.log("result:", result)
    } catch (error) {
        // console.log("error::", error)
        logger.error(util.format("Error while adding product form %O", error))
        throw new Error(error)
    }
}

exports.getProductForm = async () => {
    try {
        return await Productform.findOne({})
    } catch (error) {
        logger.error(
            util.format("Error while adding product form %O", error)
        )
        throw new Error(error)
    }
}