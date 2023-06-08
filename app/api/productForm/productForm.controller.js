
const productForm = require("../../models/productForm.model")
const mongoCommon = require("../mongoCommon/mongoCommon.controller")


exports.addProductForm = async (doc) => {
    try {
        const result = await mongoCommon.addDocuments("productForm", doc)
        console.log("result:", result)
    } catch (error) {
        console.log("error::", error)
    }
}