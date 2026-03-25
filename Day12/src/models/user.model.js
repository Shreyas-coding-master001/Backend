const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String, 
        unique: [true, "With this email user account already exists"]
    },
    password : String
});

module.exports = mongoose.model("users", userSchema);