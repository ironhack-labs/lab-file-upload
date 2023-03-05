const router = require("express").Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const fileUploader = require("../config/cloudinary.config");

router.post(
  "/post-content",
  fileUploader.single("picPath"),
  (req, res, next) => {
    const {content, picName} = req.body;
    const picPath = req.file?.path;
    console.log(content,picName,picPath)
    if (!content || !picName ) {
      res.render("users/new-post", {
        errorMessage:
          "All fields are mandatory. Please provide a name, a description and a image for the post.",
      });
      return;
    }

    Post.create({
      content,
      creatorId: userInSession._id,
      picPath,
      picName,
    }).then(() => res.redirect("/my-posts"));
  }
);

router.get("/new-post", (req, res) => res.render("users/new-post"));

router.get("/my-posts", (req, res) => {
  Post.find()
  .then(
    allPosts =>{
      return allPosts.filter(post=> post.creatorId = userInSession._id)
    }
  )
  .then(posts=>res.render("users/my-posts", {posts}))
  .catch(err=>console.log("error during the retrive of posts", err))

});


module.exports = router;
