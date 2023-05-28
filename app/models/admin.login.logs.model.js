const mongoose = require("mongoose")
const Schema = mongoose.Schema


const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }

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
        enum: ["Logout", "change_password"]
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
    this.updatedDate = new Date()
    next()
})

module.exports = mongoose.model("admin_login_log", AdminLoginlogsSchema)