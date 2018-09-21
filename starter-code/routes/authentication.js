const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require('../models/post');

router.post('/new', upload.single('picPath'), ensureLoggedIn(), (req, res) => {
    Post.create({ ...req.body, creatorId: req.user._id, picPath: req.file.path });
    res.send('Post creado');
});

router.get('/new', ensureLoggedIn(), (req, res) => {
    // console.log(req.user);
    res.render('new');
});

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error') });
});

router.post('/signup', upload.single('photo'), ensureLoggedOut(), passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
}));

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