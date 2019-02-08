const express = require('express');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');
const User = require('./models/user');


const router = express.Router();

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.get('/profile/update/:id', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile-update', {
  });
});

router.post('/profile/update', ensureLoggedIn('/login'), (req, res) => {
    const
    res.render('authentication/profile-update', {
  });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
