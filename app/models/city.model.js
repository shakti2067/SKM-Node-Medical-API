const mongoose = require("mongoose");
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        upadateAt: "updatedDate"
    }
}

const localitySchema = Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    type: {
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
}, schemaOptions)


const citySchema = Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
    country: {
        type: mongoose.Types.ObjectId,
        ref: "country"
    },
    state: {
        type: mongoose.Types.ObjectId,
        ref: "state"
    },
    locality: [localitySchema],
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, schemaOptions)


localitySchema.pre("save", function (next) {
    this.updateDate = Date.now()
    next()
})

citySchema.pre("save", function (next) {
    this.upadateAt = Date.now()
    next()
})


module.exports = {
    City: mongoose.model("city", citySchema),
    Locality: mongoose.model("locality", localitySchema)
}