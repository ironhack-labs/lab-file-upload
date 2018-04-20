const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.get("/", (req, res, next) => {
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

  Post.find().then(posts => {
    console.log(posts);
    res.render("index", { userData, posts });
  });

});

module.exports = router;
