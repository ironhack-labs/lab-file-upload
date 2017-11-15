const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.render('index', { posts, title: 'IronTumblr', user: req.user });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
