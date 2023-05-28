const mongo = require("../mongoCommon/mongoCommon.controller")
const Product = require("../../models/product.model")

const logger = require("../../utils/common")
const util = require("util")

exports.addProduct = async (data) => {
    try {
        // console.log("data", data)
        const result = await mongo.addDocuments("product", data)
        // console.log("result::", result)
        return result
    } catch (error) {
        logger.error(
            util.format("Error while adding product doc %O", error)
        )
        throw error
    }
}

exports.getProduct = async (pageSize, pageNumber) => {
    try {
        let query, skip, limit
        let main = {}
        query = {
            isActive: true
        }

        skip = Number(pageSize * (pageNumber - 1))
        limit = Number(pageSize)
        // console.log("skip && limit::::", skip, limit)


        if (skip && limit) {
            main.result = await Product.find(query).skip(skip).limit(limit)
            main.total_count = await Product.find(query).skip(skip).limit(limit).countDocuments()

        } else {
            main.result = await Product.find(query).limit(limit)
            main.total_count = await Product.find(query).limit(limit).countDocuments()

        }
        return main

    } catch (error) {
        logger.error(
            util.format("error while getting document from produt %O", error)
        )
        throw error
    }
}

exports.getProductByCategory = async (id, pageNumber, pageSize) => {
    try {

        let query, skip, limit;
        let main = {}

        skip = Number(pageSize * (pageNumber - 1))
        limit = Number(pageSize)

        // console.log("skip && limit:::", skip, limit)

        query = {
            $or: [
                {
                    category: id,
                },
                {
                    sub_category: id
                }
            ],
            $and: [
                {
                    isActive: true,
                }, {
                    isDeleted: false
                }
            ]
        }
        // console.log("query::", query)

        if (skip && limit) {
            main.result = await Product.find(query)
                .populate({
                    path: "category",
                    select: "title"
                })
                .populate({
                    path: "brand",
                    select: "title"
                }).skip(skip).limit(limit)

            main.total_count = await Product.find(query).skip(skip).limit(limit).countDocuments()
        } else {
            main.result = await Product.find(query)
                .populate({
                    path: "category",
                    select: "title"
                })
                .populate({
                    path: "brand",
                    select: "title"
                }).limit(limit)

            main.total_count = await Product.find(query).limit(limit).countDocuments()
        }

        return main
    } catch (error) {
        logger.error(
            util.format("Error while Getting Document to Country By id %O", error)
        )
        throw error
    }
}