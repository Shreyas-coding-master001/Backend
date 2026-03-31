const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel",
        required : [true, "Liked User ObjectID required"]
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "posts",
        required : [true, "Post to which liked is required"]
    } 
}, {timestamps : true});

likeSchema.index({user : 1, post : 1}, {unique : true});

module.exports = mongoose.model("likes", likeSchema);