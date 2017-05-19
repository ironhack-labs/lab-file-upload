const express    = require('express');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const multer     = require('multer');
const path       = require('path');
const User       = require('../models/user.js');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');




router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { errorMessage: req.flash('error', 'Please log in')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  successFlash: true,
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

const myUpload   = multer({
   dest: path.join(__dirname, '../public/uploads')
});

router.post('/signup',
  ensureLoggedOut(),
  myUpload.single('photoAddress'),
  passport.authenticate('local-signup',
    {
      successRedirect : '/',
      successFlash: true,
      failureRedirect : '/signup',
      failureFlash : true
    }
  )
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    req.flash('success', 'You have successfully logged out');
    res.redirect('/');
});

module.exports = router;
