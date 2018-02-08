const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');

/* GET home page. */
router.get('/', (req, res, next) => {
  let user = req.user;
  if (user) {
    Post.find().exec((err, posts) => {
      res.render('./posts/index', {
        posts: posts
      });
    });    
  } else {
    Post.find().exec((err, posts) => {
      res.render('index', {
        posts: posts
      });
    });
  }
});

module.exports = router;
