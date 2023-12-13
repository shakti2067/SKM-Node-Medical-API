const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const adminUserOtpSchema = Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    otp: {
        type: String,
    },
    otpSendDate: {
        type: Date,
        default: "",
        required: true
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

adminUserOtpSchema.pre("save", function (next) {
    this.updatedDate = new Date()
    next()
})


module.exports = mongoose.model("admin_otp", adminUserOtpSchema)