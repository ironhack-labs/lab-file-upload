const express = require('express');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  Post.find().then(post => {
    res.render('index', {
      post,
      title: 'IronTumblr'
    });
  });
});

module.exports = router;
