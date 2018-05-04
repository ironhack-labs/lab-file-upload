const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer");
const upload = multer({ dest: "./public/profilePics/" });
const User = require("../models/user");



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

router.post('/signup', upload.single('profilePic'), (req, res, next) => {
    req.body.profilePic = ('./public/profilePics/' + req.file.filename);
    User.create(req.body)
        .then(r => res.render("index"))
        .catch(e => console.log(e));
});

/* router.post('/signup', upload.single("profilePic"), ensureLoggedOut(), passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}), (req, res, next) => {
    req.body.profilePic.push("/profilePics/" + filename);
    User.create(req.body)
        .then(r => res.json(r))
        .catch(e => console.log(e))
}); */

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;