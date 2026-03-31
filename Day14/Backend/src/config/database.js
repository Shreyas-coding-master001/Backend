const mongoose = require("mongoose");

async function connectDb(){
    try{ 
        await mongoose.connect(process.env.MONGO_URI); 

        console.log("DataBase Connected");
    }
    catch(err) { console.log(err.message); }
}

module.exports = connectDb;