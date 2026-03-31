//Config Files : 
const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

// Start the server : 
app.listen(3000, () => console.log("Server is running at 3000"));