const express = require("express");
const passport = require("passport");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/index", (req, res) => {
  Post.find({}).then(post => {
    res.render("posts/index", { post });
  });
});

router.get("/new", ensureLoggedIn(), (req, res) => {
  res.render("posts/new");
});

router.post(
  "/create",
  [ensureLoggedIn(), uploadCloud.single("photo")],
  (req, res) => {
    const newPost = new Post();
    newPost.content = req.body.content;
    newPost.creatorId = req.user.username;
    newPost.picPath = req.file.url;
    newPost.picName = req.file.originalname;
    newPost
      .save()
      .then(() => {
        res.redirect("/index");
      })
      .catch(error => {
        console.log("Error to add a new post" + error);
        res.redirect("/new");
      });
  }
);

router.post(
  "/createcomments/:_id",
  [(ensureLoggedIn(), uploadCloud.single("photo"))],
  (req, res) => {
    const comment = new Comment();
    comment.content = req.body.content;
    comment.authorId = req.user.username;
    comment.imagePath = req.file.url;
    comment.imageName = req.file.originalname;

    comment
      .save()
      .then(savedComment => {
        Post.findByIdAndUpdate(req.params._id, {
          $push: { comments: savedComment }
        }).then(() => res.redirect('/index'))
        // Post.findByIdAndUpdate(req.params._id, movieEdited)
        //   .then(() => {
        //     res.redirect("/index");
        //   })
        //   .catch(error => console.log("Error to update a post" + error));
      })
      .catch(error => {
        console.log("Error to add a new post" + error);
        res.redirect("/new");
      });
  }
);

module.exports = router;
