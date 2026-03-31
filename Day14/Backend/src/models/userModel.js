const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   username : {
      type : String,
      unique : [true, "User Already Exists"],
      required : true
   },
   email : {
      type : String,
      unique : [true, "User Already Exists"],
      required : true
   },
   password : {
      type : String,
      required : true
   },
   bio : String,
   profileImage : {
      type : String,
      default : "https://ik.imagekit.io/t7oiyoofv/images.jpg"
   }
});

module.exports = mongoose.model("userModel", userSchema);