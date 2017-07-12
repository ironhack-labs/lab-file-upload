const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');


/* GET home page. */
router.get('/', (req, res, next) => {

  Post.find({}, (err, posts) => {
    if (err) {
      return next(err);
    } else {

      let user;
      if(req.user) user = req.user;

      //TODO get user data from creatorID in Post Model

      res.render('index', {
        title: 'Express - Generated with IronGenerator',
        posts: posts,
        user: user || ''
      });
    }
  });
});

module.exports = router;
