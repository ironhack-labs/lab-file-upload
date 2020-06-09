const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');

const mongoose = require('mongoose');

const routeGuard = require('../configs/route-guard.config');

router.get("/", (req, res) => {
  Post
  .find({})
  .populate("creator")
  .then(posts => {
    posts = posts.reverse();
    res.render("post/post-list",{posts: posts});
  })
  .catch((err) => {
    console.log("Err",err);
  })
});

module.exports = router;
router.get("/", (req, res) => {
  Post
  .find({})
  .populate("creator")
  .then(posts => {
    posts = posts.reverse();
    res.render("post/post-list",{posts: posts});
  })
  .catch((err) => {
    console.log("Err",err);
  })
});

module.exports = router;
