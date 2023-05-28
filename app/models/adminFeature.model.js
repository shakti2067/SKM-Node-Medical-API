const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const adminFeatureSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    url: {
        type: String,
        default: ""
    },
    is_Parent: {
        type: Boolean,
        default: false
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: "adminfeature",
        default: null
    },
    icon_name: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    schemaOptions)


adminFeatureSchema.pre("save", function (next) {
    this.updatedDate = Date.now()
    next()
})

module.exports = mongoose.model('adminFeature', adminFeatureSchema)