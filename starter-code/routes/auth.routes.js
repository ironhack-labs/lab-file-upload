const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require('../models/Post.model.js')
const uploadLocal = multer({ dest: './stylesheets/Uploads' })

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
    passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {

    res.render('authentication/profile', {});
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get('/profile/create-post', (req, res, next) => res.render('authentication/create-post', { dest: 'CDN', path: 'upload-local' }))

router.post('/profile/create-post', uploadLocal.single('imageFile'), (req, res, next) => {

    req.file.size > 400000 ? console.log('El archivo es demasiado grande') : console.log(req.body)

    Post.create({

            content: req.body.content,
            creatorId: req.user.id,
            picPath: `./Uploads/${req.file.filename}`,
            picName: req.file.originalname

        })
        .then(() => res.redirect('/'))
        .catch(err => console.log('Error at upload the image', err))

})






module.exports = router;