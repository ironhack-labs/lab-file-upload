const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Post = require("../models/post");

/* GET home page. */
router.get("/", ensureLoggedOut("/indexConnected"), (req, res, next) => {
  Post.find({}).exec((err, posts) => {
    res.render("index");
  });
});

router.get("/", ensureLoggedIn("/"), (req, res) => {
  res.render("indexConnected", {
    user: req.user
  });
});

router.get("/indexConnected", ensureLoggedIn("/"), (req, res) => {
  Post.find({}).exec((err, posts) => {
    res.render("indexConnected", {
      user: req.user,
      posts: posts
    });
  });
});

module.exports = router;
