const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function userFind(req, res, next){
    try{
        const token = req.cookies.jwttoken;
        
        const userAuth = await jwt.verify(token , process.env.JWT_SECERT);
        
        if(!userAuth) res.status(401).json({message : "User has no token, Unauthorized Access"});

        req.userAuth = await userModel.findOne({_id : userAuth.userId});

        next();

    }catch(err){
        console.log(err);
        res.status(401).json({message : "User is Unauthorized to access the URL",
            error : err.message
        });
    }
}

async function userID(req, res, next){
    const token = req.cookies.jwttoken;
    let userAuth = null;
    try{
       userAuth = await jwt.verify(token, process.env.JWT_SECERT);
    }catch(err){
        res.status(401).json({message : "User is Unauthorized for the URL"});
    }

    req.userId = userAuth.userId;
    next();
}

module.exports = {
    userFind, 
    userID
};