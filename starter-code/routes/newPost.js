const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Post = require("../models/Posts");
const mongoose = require("mongoose");

const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

router.get('/show', (req, res) => {
  Post.find().sort({updated_at: -1})
  .then((post) => {
    res.render('posts/show', {post});
  });  
});

router.get("/new", ensureLoggedIn(), (req, res) => {
  res.render("posts/new");
});

router.post("/new", upload.single("image"), ensureLoggedIn(), (req, res, next) => {
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.file.picName
  });
  
  newPost.save((err) => {
    res.redirect('/wd q')
  });
});

module.exports = router;
