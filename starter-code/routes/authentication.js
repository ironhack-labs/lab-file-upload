const express = require('express');
const uploadCloud = require('../config/cloudinary.js')
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require('../models/post');

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

router.post('/signup', [ensureLoggedOut(), uploadCloud.single('photo')], passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/formPost', ensureLoggedIn(), (req, res) => {
    res.render('authentication/formPost', { message: req.flash('error') });
})

router.post('/formPost', [ensureLoggedIn(), uploadCloud.single('picPhoto')], (req, res) => {
    const picPath = req.file.url;
    const picName = req.file.originalname;
    const { content } = req.body
    const newPost = new Post({
        content,
        picName,
        picPath
    });

    newPost.save((err) => {
        if (err) { next(null, false, { message: newPost.errors }) }
        return res.redirect('/createPost')
    })

    // res.render('/createPost', { message: req.flash('error') });

})

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