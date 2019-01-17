const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

/* GET home page. */
router.get("/", (req, res, next) => {
  // User.find((err, users) => {
  //   res.render("index", { users });
  // });
  Post.find((err, posts) => {
    res.render("index", { posts });
  });
});

module.exports = router;
