const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}


const brandSchema = Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, schemaOptions)


brandSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("brand", brandSchema)