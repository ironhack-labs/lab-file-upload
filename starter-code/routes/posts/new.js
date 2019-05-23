const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('posts/new')
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));