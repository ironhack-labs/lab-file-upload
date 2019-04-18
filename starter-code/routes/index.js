const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const upload = multer({ dest: "./public/uploads/" });
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

/* GET home page. */
router.get("/", (req, res, next) => {
  Post.find()
    .populate("user")
    .populate("comment")
    .then(posts => res.render("index", { posts }));
});

router.get("/newPost", ensureLoggedIn("/login"), (req, res) => {
  res.render("post/new");
});

router.get("/profile/:id", (req, res) => {
  User.findById(req.params.id).then(user => {
    user.id == req.user._id
      ? res.render('authentication/profile',{user})
      : res.render('authentication/profile',{
          message: "You can't acces another user profile"
        });
  });
});

router.post("/newPost", upload.single("photo"), (req, res) => {
  let content = req.body.content;
  let picName = req.body.photoname;
  let post = new Post({
    content,
    creatorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName
  });
  post.save().then(res.redirect("/"));
});

router.post("/newComment/:postId", upload.single("photo"), (req, res) => {
  let content = req.body.content;
  let picName = req.body.photoname;
  let comment = new Comment({
    content,
    authorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName
  });
  Post.findByIdAndUpdate(req.params.postId, {
    $push: { comments: comment }
  }).then(comment.save().then(res.redirect("/")));
});

module.exports = router;
