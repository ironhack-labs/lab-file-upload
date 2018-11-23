require('dotenv').config();
const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post.js')
const User = require('../models/User.js');
const uploadCloud = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {

    res.render('index', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error') });
});

router.post('/signup', [ensureLoggedOut(), uploadCloud.single('photo')], passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

router.post('/profile', [ensureLoggedIn(), uploadCloud.single('photo')], (req, res) => {
    const content = req.body;
    const picPath = req.file.url;
    const picName = req.file.originalname;

    const newUser = new Post({
        content,
        creatoreId: req.user._id,//Id creator
        picPath,
        picName
    });
    newUser.save()
    .then(
        res.render('/profile', {newUser})
    )
    .catch();
    
})
    router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
        req.logout();
        res.redirect('/');

    });

    module.exports = router;
