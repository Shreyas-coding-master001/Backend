const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {followUserController, followRequestStatus} = require("../controllers/follow.controller");
const followRoute = express.Router();

/**
 * @route Post /api/follow/:userID
 * @desciption This Route is used to Follow a certain user using Edge Collection
 */
followRoute.post("/:userID", authMiddleware.userID, followUserController);

/**
 * @route Patch /api/follow/:ObjectID
 * @description If user accept's or reject's the follow request.
 * */

followRoute.patch("/:ObjectID", authMiddleware.userID, followRequestStatus);


module.exports = followRoute;