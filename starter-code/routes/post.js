const express = require("express");
const passport = require("passport");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/post");
const User = require("../models/user");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/index", (req, res) => {
  Post.find({}).then(post => {
    res.render("posts/index", { post });
  });
});

router.get("/new", ensureLoggedIn(), (req, res) => {
  res.render("posts/new");
});

router.post("/create", [ensureLoggedIn(), uploadCloud.single('photo')], (req, res) => {
  const newPost = new Post();
  newPost.content = req.body.content;
  newPost.creatorId = req.user.username;
  newPost.picPath = req.file.url;
  newPost.picName = req.file.originalname;
  newPost.save()
    .then(() => {
      res.redirect('/index')
    })
    .catch(error => {
      console.log("Error to add a new post" + error)
      res.redirect('/new')
    })  
});

module.exports = router;