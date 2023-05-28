const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schemaOptions = {
    createdAt: "createdDate",
    updateAt: "updateDate"
}

const AdminLoginlogsSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "adminuser"
    },
    token: {
        type: String,
    },
    expiredToken: {
        type: Date,
        default: new Date()
    },
    logoutStatus: {
        type: String,
        enum: ["Logout", "Login"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeteled: {
        type: Boolean,
        default: false
    }
},
    schemaOptions)

AdminLoginlogsSchema.pre("save", function (next) {
    this.updateDate = new Date()
    next()
})

module.exports = mongoose.model("admin_login_log", AdminLoginlogsSchema)