const express = require("express");
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/post");
const router = express.Router();

router.get("/posts/new", (req, res, next) => {
  const userId = req.session.passport.user;
  const imgPath = "";
  if (userId) {
    if (userId.profileImg) {
      imgPath = userId.profileImg.path;
    }
  }
  let userData = {
    userId,
    imgPath
  };

  res.render("posts/new", { userData });
});

router.get("/posts/show", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
