const express = require("express");
const passport = require("passport");
const router = express.Router();
const uploadCloud = require("../config/cloudinary.js");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Post = require("../models/post");

router.get("/newpost", ensureLoggedIn(), (req, res) => {
  res.render("posting/newpost", { message: req.flash("error") });
});

router.post(
  "/newpost",
  [ensureLoggedIn(), uploadCloud.single("post-pic")],
  (req, res) => {
    const imgPath = req.file.url;
    const content = req.body.content;
    let posterId = req.session.passport.user;
    const newPost = new Post({
      content,
      imgPath,
      posterId
    });

    newPost.save().then(() => res.redirect("/"));
  }
);

module.exports = router;
