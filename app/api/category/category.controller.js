
const Category = require('../../models/category.model')
const mongo = require("../mongoCommon/mongoCommon.controller")

const logger = require("../../utils/logger");
const util = require("util")

const fs = require("fs");
const mongoose = require('mongoose');





exports.getCategory = async () => {
    try {
        let query;
        query = {
            isDeleted: false,
            isActive: true
        }

        const result = await mongo.getAllDocuments("category", query)
        return result

    } catch (error) {
        logger.error(
            util.format("error while getting category %O", error)
        )
        throw error
    }
}

exports.addCategory = async (data) => {
    try {

        const result = await mongo.addDocuments("category", data)

        return result
    } catch (error) {
        logger.error(
            util.format("error while adding category %O", error)
        )
        throw error
    }
}

exports.addChildInParentCategory = async (parentId, id) => {
    try {
        await Category.updateOne(
            {
                _id: parentId
            },
            {
                $addToSet: {
                    child: id
                }
            }
        );
    } catch (error) {
        logger.error(
            util.format("error while updating category %O", error)
        )
        throw error
    }
}

exports.getParentCategory = async () => {
    try {
        let query;
        query = {
            isParent: true,
            isActive: true,
            isDeleted: false
        }

        const result = await mongo.getAllDocuments("category", query)
        // console.log("resutl::", result)
        return result

    } catch (error) {
        logger.error(
            util.format("error while getting category doc %O", error)
        )
        throw error
    }
}