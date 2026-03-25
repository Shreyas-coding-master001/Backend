const express = require("express");
const route = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

route.post("/register", async (req,res) =>{
    try{
        let {username, email, password} = req.body;

        const isUserExist = await userModel.findOne({ email });

        if(isUserExist) res.status(422).json({message: "User Already exist !!",isUserExist});

        const user = await userModel.create({username, email, password});

        let jwt_token = jwt.sign({username , email},process.env.JWT_Secret);

        res.cookie("jwt_token",jwt_token);

        res.status(201).json({message: "User Created", user, jwt_token});

    }catch(err){
        console.error(err);
    }
});


module.exports = route;