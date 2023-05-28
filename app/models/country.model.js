const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaOptions = {

    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const countrySchema = Schema({
    title: {
        type: String,
        default: ""
    },
    code: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    schemaOptions)

countrySchema.pre("save", function (next) {
    this.updateDate = Date.now()
    next()
})


module.exports = mongoose.model("country", countrySchema)