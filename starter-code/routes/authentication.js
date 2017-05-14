const express    = require('express');
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer     = require('multer');
const path       = require('path');

const User = require('../models/user.js');

const router     = express.Router();


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

const myUploader = multer({
  dest: path.join(__dirname, '../public/uploads')
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
    { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
