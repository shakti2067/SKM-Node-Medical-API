const mongoose = require("mongoose");
const Schema = mongoose.Schema

const shemaOptions = {
    timestamps: {
        createdAt: "createdDate",
        updatedAt: "updatedDate"
    }

}

const categorySchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    key: {
        type: String,
        default: ""
    },
    isParent: {
        type: Boolean,
        default: false
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        ref: "category",
        default: null
    },
    child: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "category"
        }
    ],
    image: {
        type: String,
        default: ""
    },
    icon: {
        type: String,
        default: ""
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isTrending: {
        type: Boolean,
        default: false,
    },
    isNewlaunch: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, shemaOptions)


categorySchema.pre("save", function (next) {
    this.updatedAt = new Date()
    next()
})


module.exports = mongoose.model("category", categorySchema)
