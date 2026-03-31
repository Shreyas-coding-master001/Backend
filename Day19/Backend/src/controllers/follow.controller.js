const followModel= require("../models/follows.model");
const userModel = require("../models/userModel");

/**
 * @route Post /api/follow/:userID
 * @description Here following relationship code is written
 * @access Private 
 * @param {*} req -> req.userId -> user._id milegi
 */

async function followUserController(req, res){
    const _id = req.userId;
    const followingID = req.params.userID;

    if(!followingID){
        return res.status(404).json({message : "ObjectID of follower's was not Found"});
    }

    if(_id === followingID) return res.status(422).json({message : "User Cannot Follow itself"});

    const user = await userModel.findById(_id);
    const followingUser = await userModel.findById(followingID);
    
    if(!user || !followingUser){
        return res.status(404).json({message : "User's Not Present"});
    }

    const isAlreadyFollow = await followModel.findOne({
        follower : _id,
        following : followingID
    });

    if(isAlreadyFollow) {
        return res.status(400).json({
            message : `User(${user.username}) Already follow's ${followingUser.username}`
        });
    }

    const followCollection = await followModel.create({
        follower : _id,
        following : followingID
    });
    
    res.status(201).json({
        message : `${user.username} is trying to follow ${followingUser.username}`,
        user,
        followCollection
    })
}

/**
 * @route Patch /api/follow/:ObjectID
 * @description Follow Request Status(accepted or rejected) is Updated here;
 * @access Private
 */

async function followRequestStatus(req, res){
    const Objectid = req.params.ObjectID;
    const status = req.body.status;
    
    const followDocument = await followModel.findById(Objectid);

    if(!followDocument) return res.status(404).json({message : "No existing Document in the Collection"});

    if(status !== "accepted" && status !== "rejected") return res.status(422).json({message : "Status can only be accepted or rejected"});

    const statusUpdated = await followModel.findByIdAndUpdate(Objectid,{status});

    res.status(200).json({message : `status updated to : ${status}`});
}

module.exports = {
    followUserController,
    followRequestStatus
};