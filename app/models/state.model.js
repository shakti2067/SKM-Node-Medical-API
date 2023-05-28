const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const stateSchema = Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    country: {
        type: mongoose.Types.ObjectId,
        ref: "country"
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


stateSchema.pre("save", function (next) {
    this.updateDate = Date.now()
    next()
})

module.exports = mongoose.model("state", stateSchema)