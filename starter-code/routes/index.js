const express = require('express');
const router  = express.Router();
const Post = require('../models/post');
/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then (allPosts => {
      res.render('index', {allPosts});
    });
});

module.exports = router;
