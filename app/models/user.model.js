const mongoose = require("mongoose");
const Schema = mongoose.Schema

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const schmaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }
}

const userSchema = new Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "User"
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: "adminRole"
    },
    profilePicture: {
        type: String,
        default: ""
    },
    mobileNumber: {
        type: String,
        default: ""
    },
    salt: {
        type: String,

    },
    hashPassword: {
        type: String
    },
    token: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "Female"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    isLogout: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    state: {
        type: mongoose.Types.ObjectId,
        ref: "state"
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: "city"
    },
    salt: {
        type: String
    }

},
    schmaOptions)


userSchema.pre("save", function (next) {
    this.updatedDate = Date.now()
    next()
})

// userSchema
//     .virtual('token')
//     .get(function () {
//         return {
//             "_id": this._id,
//             "username": this.username,
//             "mobileNumber": this.mobileNumber,
//             "profilePicture": this.profilePicture
//         }
//     })

userSchema.methods = {

    signToken: function (planText) {
        this.token = jwt.sign(planText, process.env.JWT_TOKEN_SECRETE, {
            // expiresIn: "1h"
        })
        return this.token
    },

    // salt: function (text) {
    //     bcrypt.genSalt(saltRound, (err, salt){
    //         if (err) {
    //             console.log("error in salt:::", err)
    //         } else {
    //             console.log("salt:::", salt)
    //         }
    //     })
    // },

    encryptPassword: async function (planText) {
        let saltRound = 10

        this.salt = await bcrypt.genSalt(saltRound)

        this.hashPassword = await bcrypt.hash(planText, this.salt)
        return this.hashPassword
    },

    authenticate: function (planText, hash) {
        // let saltRound = 10
        return bcrypt.compare(planText, hash)
    }
}

module.exports = mongoose.model('user', userSchema)


