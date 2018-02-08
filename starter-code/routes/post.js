const Post = require('../models/Post');
const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('posts/new', { user: req.user });
});

router.post('/new', ensureLoggedIn('/login'),(req,res, next) => {
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user.username,
  });

    newPost.save( (err) => {
      if(err){
        return next(err)
      }
      return res.redirect('/');
    });
  });
  

module.exports = router;