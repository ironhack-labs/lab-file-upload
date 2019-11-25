const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const posts = await Post.find().populate("creatorId");
  res.render("index", {
    posts
  });
});


module.exports = router;
