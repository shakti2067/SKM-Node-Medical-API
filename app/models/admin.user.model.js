const mongoose = require("mongoose");
const Schema = mongoose.Schema

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const schemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const adminSchema = Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        default: ""
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "role"
    },
    salt: {
        type: String,
    },
    hashPassword: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    hashPassword: {
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

adminSchema.pre("save", function (next) {
    this.updateDate = new Date()
    next()
})


adminSchema
    .virtual('token')
    .get(function () {
        return {
            "_id": this._id,
            "role": this.role,
            "roleId": this.roleId,
            "username": this.username,
            "mobileNumber": this.mobileNumber,
            "profilePicture": this.profilePicture
        }
    })

adminSchema.methods = {

    SignToken: function (planText) {
        return jwt.sign(this.token, process.env.JWT_TOKEN_SECRETE, { expiresIn: "7 days" })
    },


    encriptPassword: async function (planText) {
        let saltRound = 10
        this.salt = await bcrypt.genSalt(saltRound)

        this.hashPassword = await bcrypt.hash(planText, this.salt)
        return this.hashPassword
    },

    authenticate: function (planText) {
        return bcrypt.compare(planText, this.hashPassword)
    }
}

module.exports = mongoose.model("adminuser", adminSchema)




