const express = require("express");
const postRouter = express.Router();
const postControllers = require("../controllers/post.contorllers");
const multer = require("multer");
const {userFind} = require("../middleware/auth.middleware");

// Multer : MemoryStorage
const storage = multer.memoryStorage();
const upload = multer({storage : storage});

/**
 * @route /api/post
 * @desciption Creating a Post of image in the cloud(imagekit) and compressing the image(using sharp)
 */
postRouter.post("/", userFind, upload.single("image"), postControllers.postController);

postRouter.get("/", userFind, postControllers.getPostController);

postRouter.get("/details/:postid", userFind, postControllers.getPostDetailsController);

/**
 * @route /api/post/like/:id
 * @description Liking or disLiking a post given with id
 */
postRouter.post("/like/:id", userFind, postControllers.LikeController);

module.exports = postRouter;