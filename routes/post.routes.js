const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model")
const fileUploader = require("../config/cloudinary.config");

router.post(
  "/post-content",
  fileUploader.single("picPath"),
  (req, res, next) => {
    const {content, picName} = req.body;
    const picPath = req.file?.path;

    if (!content || !picName ) {
      res.render("users/new-post", {
        errorMessage:
          "All fields are mandatory. Please provide a name, a description and a image for the post.",
      });
      return;
    }

    Post.create({
      content,
      creatorId: req.session.currentUser._id,
      picPath,
      picName,
    }).then(() => res.redirect("/my-posts"));
  }
);

router.get("/new-post", (req, res) => res.render("users/new-post"));

/* router.get("/my-posts", (req, res) => {
  Post.find()
  .then(
    allPosts =>{
      return allPosts.filter(post=> post.creatorId = req.session.currentUser._id)
    }
  )
  .then(posts=>res.render("users/my-posts", {posts}))
  .catch(err=>console.log("error during the retrive of posts", err))

}); */

router.get("/all-posts", (req, res) => {
  Post.find()
  .then(posts=>res.render("users/all-posts", {posts}))
  .catch(err=>console.log("error during the retrive of posts", err))

});


router.post(
  "/post-comment/:id",
  fileUploader.single("imagePath"),
  (req, res, next) => {
    const {content, imageName} = req.body;
    const imagePath = req.file?.path;


    if (!content ) {
      res.render("users/all-posts", {
        errorMessage:
          "All fields are mandatory. Please provide a name, a description and a image for the post.",
      });
      return;
    }

    Comment.create({
      content,
      authorId: req.session.currentUser._id,
      postId: req.params.id,
      imagePath,
      imageName,
    }).then(() => res.redirect(`/post/${req.params.id}`));
  }
);


router.get("/post/:id", (req,res)=>{

    Post.findById(req.params.id)
    .then(post =>{
      Comment.find({postId:req.params.id})
      .populate("authorId")
      .then(comments => res.render("users/post", {post,comments}))
      .catch(err=>console.log("err in fetching comments",err))
    

    
  })})




module.exports = router;
