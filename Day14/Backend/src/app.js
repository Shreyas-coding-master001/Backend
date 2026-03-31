// All libraries and Routes: 
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const postRouter = require("./routes/post.route");
const followRoute = require("./routes/follow.route");

// Calling Server(Creating a Server) : 
const app = express();

// Middleware :
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/post", postRouter);
app.use("/api/follow", followRoute);

app.get("/", (req, res) => {
    res.status(200).json({message : "InitaL Message!!"});
});

module.exports = app;