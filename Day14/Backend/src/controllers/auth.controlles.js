const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");

async function registerUser(req, res){
    const {username, email, password, bio} = req.body;

    try{    
        const userExist = await userModel.findOne({
            $or : [
                {username},
                {email}
            ]
        });

        if(userExist){
            return res.status(409).json({
                message : "User Already Exist"
            });
        }

        const hash = await bycrpt.hash(password, 10);

        const userCreated = await userModel.create({username, email, password : hash, bio});

        const token = jwt.sign({
            userId : userCreated._id
        }, process.env.JWT_SECERT,
        {expiresIn : "1d"});

        res.cookie("jwttoken", token);
        
        res.status(201).json({message : "User Registed", user : userCreated});
    }catch(err){
        console.log(err.message);
    }
}

async function loginUser(req, res){
    const {username, email, password} = req.body;

    try{
        const userExist = await userModel.findOne({
            $or : [
                {username},
                {email}
            ]
        });

        if(!userExist){
            res.status(409).json({
                message : "User is not registed"
            });
        }

        const isUser = await bycrpt.compare(password, userExist.password);

        console.log(isUser);
        
        if(isUser){

            const token = jwt.sign({
                userId : userExist._id
            }, process.env.JWT_SECERT,
            {expiresIn : "1d"});

            res.cookie("jwttoken", token);
            
            res.status(201).json({message : "User Registed", user : userExist});
        }

        res.status(401).json({message : "Invalid Password"});
    }catch(err){
        console.log(err.message);
    }
}


module.exports ={
    registerUser,
    loginUser
}