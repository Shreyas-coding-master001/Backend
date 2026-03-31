const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
    caption :{
        type : String,
        default : ""
    },
    imgURL : {
        type: String,
        required : [true, "No image Found!!"]
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: [true, "No User Found !!"]
    }
});

module.exports = mongoose.model("posts", postModel);