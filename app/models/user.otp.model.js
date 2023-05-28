const mongoose = require("mongoose");
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updateDate",
    }


}

const userOtpSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    otp: {
        type: String,
        default: ''
    },
    otpSendDate: {
        type: String,
        required: true,
        default: ""
    }
}, schemaOptions)


userOtpSchema.pre("save", function (next) {
    this.updateDate = Date.now()
    next()
})


module.exports = mongoose.model('userotp', userOtpSchema)