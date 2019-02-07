const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');
const multer = require('multer')
const upload = multer({
    dest: './public/uploads/'
})
const Post = require('../models/post')
const User = require('../models/user')

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

router.post('/new-post', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
    Post.create({
            content: req.body.text,
            createId: req.user.username,
            picPath: `/uploads/${req.file.filename}`,
            picName: req.file.originalname
        })
        .then(() => res.redirect('/'))
        .catch(next)
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;