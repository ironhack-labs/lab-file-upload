const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
// const User = require('../models/User.js');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const posts = await Post.find().populate("creatorId");
  res.render("index", {
    posts
  });
});


module.exports = router;

// exports.feedGet = async (req, res, next) => {
//   const posts = await Post.find().populate("creatorId");
//   res.render("index", { posts });
// };