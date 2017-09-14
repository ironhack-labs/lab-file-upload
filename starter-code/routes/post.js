const express = require('express');
const passport   = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const post = require('../models/Post')

router.get('/posts', ensureLoggedIn(), (req, res) => {
    res.render('show', { message: req.flash('error')});
});

router.post('/posts', (req, res, next) => {
  console.log(req.body)
  const postContent = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId
  }

  const hola = new post(postContent)

  hola.save((error) => {
    console.log(post)
    if(error) {
      next(error)
    } else {
      res.render('/posts')
    }
    })
});

module.exports = router;
