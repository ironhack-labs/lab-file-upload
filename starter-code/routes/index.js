require('dotenv');
const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");
const uploadCloud = require('../config/cloudinary.js');
const passport = require('passport');


router.get('/', (req, res, next) => {
  res.render('index'), {post: req.post};
});

router.get("/allPost", (req, res, next) => {
  res.render("allpost", { user: req.user });
});


router.get("/userPage", (req, res, next) => {
  res.render("userPage", { user: req.user });
});

router.post("/userPage", uploadCloud.single('photo'), passport.authenticate("local", {
  successRedirect: "/allPost",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}), (req, res, next) => {

  const { name, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const content = req.body.postText;
  const author = req.body.user.name;
  const comments = "";
debugger

  const newPost = new Post({
    content,
    author,
    comments,
    picture: { name, description, imgPath, imgName },
  });

  newPost.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/login", { message: "Something went wrong" })
      console.log(err);
    })
});








module.exports = router;
