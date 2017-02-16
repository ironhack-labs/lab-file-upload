/* jshint esversion: 6 */

const express = require('express');
const passport = require('passport');
const multer = require('multer');
const upload = multer({
    dest: './public/uploads/'
});
const User = require("../models/user");
const router = express.Router();
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {
        message: req.flash('error')
    });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {
        message: req.flash('error')
    });
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

router.post('/upload', ensureLoggedIn('/login'),
    upload.single('file'),
    function(req, res, next) {

        User.findByIdAndUpdate(req.user.id, {
            'profilePic.picPath': `/uploads/${req.file.filename}`
        }, (err, doc) => {
            if (err) return next(err);
            res.redirect('/profile');
        });
    });

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('new');
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
