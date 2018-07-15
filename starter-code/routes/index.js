const express = require('express');
const router  = express.Router();
const Post = require('../models/post')
const User = require('../models/user')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({})
  .populate('user', 'username')
  .populate('user', 'avatar')
  .exec((err, postList) => {
    if (err) {
      next(err);
      return;
    }
    res.render('index', {posts: postList})
  })

})
module.exports = router;
