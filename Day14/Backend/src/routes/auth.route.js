const express = require("express");
const  authRoute = express.Router();
const authControlles = require("../controllers/auth.controlles");

authRoute.post("/register", authControlles.registerUser);

authRoute.post("/login",authControlles.loginUser);

module.exports = authRoute;