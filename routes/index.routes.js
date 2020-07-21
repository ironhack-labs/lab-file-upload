const express = require('express');
const Post = require('../models/Post.model');
const router = express.Router();

/* GET home page */
router.get('/', (req, res) => {
  Post.find()
    .populate('creatorId')
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'authorId',
        model: 'User'
      }
    })
    .then(post => {
      res.render('index', {
        post,
        title: 'IronTumblr'
      });
    });
});

module.exports = router;
