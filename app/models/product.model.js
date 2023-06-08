const mongoose = require("mongoose");
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const productSchema = Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    modifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: "counter"
    },
    form: [],
    filterForm: [],
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isTrending: {
        type: Boolean,
        default: false
    },
    isNewLaunch: {
        type: Boolean,
        default: false
    },
    isFeature: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,

    }
}, schemaOptions)

productSchema.pre("save", function (next) {
    this.updatedDate = new Date()
    next()
})

module.exports = mongoose.model("product", productSchema)