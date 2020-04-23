const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer')
const User = require('../models/User.model')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//File local upload settings 
const uploadLocal = multer({ dest: './public/uploads' })

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error') });
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
    res.render('authentication/signup', { message: req.flash('error') });
});

router.post(
    '/signup',
    ensureLoggedOut(),
    uploadLocal.single('profileImg'),
    passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;
