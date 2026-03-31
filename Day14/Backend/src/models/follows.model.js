const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
    follower : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel",
        required : [true, "Cannot Follow without User ObjectID"]
    },
    following : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required :[true, "Cannot Follw without follower's ObjectID"]
    },
    status : {
        type : String,
        default: "pending",
        enum : {
            values :["pending","accepted", "rejected"],
            message : "The Status can only be accepted or rejected"
        }
    }
}, {timestamps : true});

followSchema.index({follower : 1, following : 1}, {unique : true});

module.exports = mongoose.model("followers", followSchema);