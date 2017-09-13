const express = require('express');
const passport   = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/posts', ensureLoggedIn(), (req, res) => {
    res.render('show', { message: req.flash('error')});
});

router.post((req, res, next) => {
  const postContent = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
  }

  const post = new Post(newPostContent)

  post.save((error) => {
    console.log(post)
    if(error) {
      next(error)
    } else {
      res.render('/posts')
    }
  })
});

module.exports = router;
