const mongoose = require("mongoose");
const common = require("../../utils/common")
const contants = require("../../utils/constants")
const logger = require("../../utils/logger")
const util = require("util")




exports.getAllDocuments = async (model, doc) => {
    try {
        // console.log("data::", data)
        const Model = mongoose.model(model)
        // console.log("doc", doc)

        const getAllDocs = await Model.find(doc)
        if (!getAllDocs) {
            throw new Error("Documents not Found")
        } else {
            return getAllDocs
        }


    } catch (error) {
        logger.error(
            util.format(`Error while all getting Documents to %O`, error)
        )
    }
}

// get Dodument by id
exports.getDocumentById = async (model, collectionId) => {
    try {

        const Model = mongoose.model(model)

        const id = collectionId

        const newDoc = await Model.findById({ _id: id })
        // console.log("newdoc", newDoc)
        if (!newDoc) {
            throw "Documents not found"
        }

        return newDoc



    } catch (error) {
        console.log(error)
    }
}

exports.addDocuments = async (model, doc) => {
    try {
        const Model = mongoose.model(model)
        // console.log("model", Model)

        const newDoc = new Model(doc)
        // console.log("newDoc", newDoc)

        const insertDoc = await newDoc.save()
        // console.log("newDocinserr", insertDoc)
        if (!insertDoc) {
            throw "Document not saved"
        } else {
            return insertDoc
        }

    } catch (error) {
        logger.error(
            util.format(`Error while adding Documnet %O`, error)
        )
        throw error
    }

}

exports.updateDocuments = async (model, collectionId, doc) => {
    try {

        const Model = mongoose.model(model)
        // console.log("model", Model)


        const id = collectionId
        if (!id) {
            id = doc._id
        }

        const newDoc = await Model.findById({ _id: id })
        if (!newDoc) throw "Documents not found"

        // console.log("newdoc::", newDoc)

        const update = Object.assign(newDoc, doc)
        // console.log("update doc", update)
        if (!update) {
            throw "Documents is not updated"
        }

        const result = update.save()
        return result

    } catch (error) {
        // console.log(error)
        logger.error(
            util.format("Error Occured while upadting data", error)
        )
        throw error
    }
}