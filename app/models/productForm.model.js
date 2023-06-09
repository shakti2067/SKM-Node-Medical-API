const mongoose = require("mongoose");
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const productFormSchema = Schema({
    productFormTitleKey: {
        type: String,
        default: "skmForm"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    modifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    form: [],
    filterForm: [],
    isExpired: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, schemaOptions)

productFormSchema.pre("save", function (next) {
    this.updatedDate = new Date()
    next()
})

module.exports = mongoose.model("productForm", productFormSchema)