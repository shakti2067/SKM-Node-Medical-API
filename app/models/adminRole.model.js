const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schemaOptions = {
    createdAt: "createdDate",
    updatedAt: "updatedDate"
}
const RoleSchema = Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    adminFeature: [{
        type: mongoose.Types.ObjectId,
        ref: "adminfeature"
    }],
    canEdit: {
        type: Boolean
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    modifiedBy: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    }

},
    schemaOptions)

RoleSchema.pre("save", function (next) {
    this.updateDate = new Date()
    next()
})


module.exports = new mongoose.model("adminRole", RoleSchema)