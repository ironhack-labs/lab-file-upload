const express = require('express');
const passport = require('passport');
const router = express.Router();
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const upload = require('../multer');
let fotoProfile = "";

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
    res.render('profile', {fotoProfile});
});


router.post('/upload', upload.single('photo'), (req,res) => {
    console.log(req.body);
    console.log(req.file);
    fotoProfile = req.file.url;
    res.redirect('/profile');
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
