const express    = require('express');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const multer     = require('multer');
const path       = require('path');
const User       = require('../models/user.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router     = express.Router();




router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup',
 ensureLoggedOut(),
  (req, res) => {
    res.render('authentication/signup',
    { message: req.flash('error')}
    );
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
