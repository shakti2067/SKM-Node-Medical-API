const mongoose = require("mongoose");
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const productFormSchema = Schema({
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