const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const uploadCloud = require('../config/cloudinary.js');


const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// LOGIN STARTS HERE


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));


// SIGNUP STARTS HERE


router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/authentication/success',
  failureRedirect : '/authentication/signup',
  failureFlash : true
}));


router.get('/success', ensureLoggedIn(), (req, res) => {
    res.render('authentication/success', { user:req.user.username , message: req.flash('error')});
});



router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});


router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
