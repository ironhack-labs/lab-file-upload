const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uploadCloud = require('../configs/cloudinary.config');
const Picture = require('../models/Picture.model');
const User = require('../models/User.model');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
});

router.post(
  '/login',
  ensureLoggedOut(),
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
});

router.post(
  '/signup',
  ensureLoggedOut(),
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile');
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/profile', uploadCloud.single('image'), (req, res, next) => {
  const newPic = req.body;
  // newPic.user = req.session.currentUser._id;
  newPic.user = req.user._id;
  newPic.imageUrl = req.file.url;
  newPic.name = req.file.originalname;
  Picture.findOne({ user: req.user._id })
    .then(found => {
      console.log('Output for: image', found);
      if (found) {
        res.render('authentication/profile', { savedPic: found });
        return;
      }
      Picture.create(newPic)
        .then(savedPic => {
          res.render('authentication/profile', { savedPic });
        })
        .catch(err => next(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
