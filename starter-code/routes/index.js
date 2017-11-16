const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res, next) => {
  Post.find({}, null ,{limit: 20, sort: {"created_at": -1}})
    .then((posts) => {
      res.render('index', { posts, title: 'IronTumblr', user: req.user });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
