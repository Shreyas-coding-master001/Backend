const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(){
    await mongoose.connect(process.env.mongo_URI)
    .then(res => console.log("DataBase Connected Successfully"))
    .catch(err => console.error(err.message));
}

module.exports = connectDB;