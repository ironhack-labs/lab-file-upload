const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

/* GET home page. */
router.get("/", (req, res, next) => {
  let id = req.session.passport.user;
  Post.find().then(posts => {
    User.findById(id).then(user => {
      console.log(user, posts)
      res.render("index", {
        title: "Express - Generated with IronGenerator",
        user,
        posts
      });
    });
  });
});

module.exports = router;
