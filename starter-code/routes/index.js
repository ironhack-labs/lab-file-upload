const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().then(posts => {
    res.render('index', {
      title: 'Express - Generated with IronGenerator',
      user: req.user,
      posts: posts
    });
  })
});

module.exports = router;