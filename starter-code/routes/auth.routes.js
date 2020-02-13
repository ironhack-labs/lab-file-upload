const express = require('express');
const passport = require('passport');
const router = express.Router();
const Picture = require('../models/Picture.model')
const User = require('../models/User.model')
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', {
    message: req.flash('error')
  });
});

router.post(
  '/login',
  ensureLoggedOut(),
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', {
    message: req.flash('error')
  });
});

router.post(
  '/signup',
  ensureLoggedOut(),
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  // Picture.find({
  //     authorId: `5e456cee8c6dfb3d1b6cc871`
  //   })
  //.then
  (res.render('authentication/profile', {
    user: req.user,

  }))
})

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;