const app = require("./src/app");
const connectDB = require("./src/config/dbs");
const port = process.env.port;

connectDB();


app.listen(port, () => console.log("Sever is running on port",port));