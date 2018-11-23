const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup',  (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', uploadCloud.single('photo'),  passport.authenticate('local-signup', {
  successRedirect : '/login',
  failureRedirect : '/signup',
  failureFlash : true,
}
))




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
