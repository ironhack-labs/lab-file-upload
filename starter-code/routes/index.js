const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {

  Post.find({}).populate('creatorId').exec().then((posts) => {
    let user;
    if (req.user) user = req.user;
    res.render('index', {
      title: 'Express - Generated with IronGenerator',
      posts: posts,
      user: user || 'to IronTumblr'
    });
  });
});

module.exports = router;
