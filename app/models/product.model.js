const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const productSchema = Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        default: 0
    },
    discountPrice: {
        type: Number,
        default: 0,
    },
    actualPrice: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: ""
    },
    rating: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    sub_category: {
        type: mongoose.Types.ObjectId,
        ref: "categoy"
    },
    returnPolicy: {
        type: String,
        default: ""
    },
    expiredDate: {
        type: Date,
        default: ""
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "brand"
    },
    isNewLauch: {
        type: Boolean,
        default: false
    },
    isTrendingNearYou: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, schemaOptions)

productSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})


module.exports = mongoose.model("product", productSchema)