const multer = require("multer");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/postModel");
const sharp = require("sharp");
const likeModel = require("../models/likes.model");

/**
 * @route /api/post
 * @description Creating a image post in MOngo and imagekit and firstly the image is compressed by sharp npm package.
 */
async function postController(req, res){
        const client = new ImageKit({
            privateKey : process.env.IMAGE_KIT_KEY
        });

        // console.log(req.file);
        
        let fileImage = null;
        let fileBuffer = await sharp(req.file.buffer)
        .resize({width : 500})
        .webp({ quality : 70 })
        .toBuffer();

        try{
            fileImage = await client.files.upload({
            file : await toFile(Buffer.from(fileBuffer) , "file"),
            fileName : "Test",
            folder : "Cohort-2-inst"
            });


        }catch(err){
            res.status(401).json({
                message : "User not authorized",
                err
            });
        }

        const post = await postModel.create({
            caption: req.body.caption,
            imgURL : fileImage.url,
            user : req.userAuth._id
        });

        // if(!post) res.status().json({message : "User Not Found!!"})

        res.status(201).json({
            message: "Post Sent Successfull",  
            file : fileImage
        });
  
}

async function getPostController(req,res){
    const userId = req.userAuth._id;
    let posts = null;

    try{
        posts = await postModel.find({user : userId})
    }catch(err){
        res.status(500).json({message : "Unable To fetch Posts", error : err});
    }
    

    res.status(200).json({message : "User-Posts Accessed",
        user_Posts : posts
    });
}

async function getPostDetailsController(req, res){
    const userId = req.userAuth._id;
    let decoded = null;
    
    const post = await postModel.findById(req.params.postid);

    if(!post) return res.status(404).json({message : "No Post Found"});

    let isValid = post.user.toString() === userId.toString();

   if(!isValid) return res.status(403).json({ message: "User Does not have access to this Post" })

    res.status(200).json({ message : "This are Post details",
        post : post
    });
}

/**
 * @raoute /api/post/like/:id
 * @description Liking or deleting the liked Post using Edge Collection
 */
async function LikeController(req, res){
    const user = req.userAuth;
    const _id = req.params.id;

    const isExistLike = await likeModel.findOne({
        user : user._id,
        post : _id
    });
    
    let Docs = null;

    
        if(isExistLike){
            Docs = await likeModel.deleteOne({
                user: user._id,
                post : _id
            })

        }else{
            Docs = await likeModel.create({
                user : user._id,
                post : _id
            });  
        }
    
    
    res.status(201).json({message : "Data was Liked Or Deleted(Disliked)",
        Docs
    });
    
}

module.exports = { postController, getPostController, getPostDetailsController, LikeController };