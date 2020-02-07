const express = require('express');
const router  = express.Router();
const Post = require('../models/Post')

/* GET home page. */
router.get('/', async (req, res, next) => {
  const user = req.user
  const posts = await Post.find()
  res.render('index', { title: 'IronTumblr', posts, user});
});

module.exports = router;
