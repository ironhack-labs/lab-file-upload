const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const User = require('../models/user')

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

router.post('/signup',
    ensureLoggedOut(),
    upload.single('picture'),
    passport.authenticate('local-signup'),
    (req, res) => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            picture: { src: `uploads/${req.file.filename}` }
        });
        user.save((err) => {
            res.redirect('/profile');
        });
    }
);


router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile/:id', ensureLoggedIn('/login'), (req, res) => {
    Post.find({ creatorId: req.params.id })
        .then((userPosts) => {
            res.render('authentication/profile', { userPosts, id: req.params.id });
        })
});

router.post("/new", ensureLoggedIn('/login'), (req, res) => {
    console.log(req.file)
    const post = {
        content: req.body.content,
        creatorId: req.body.creatorId,
        picture: req.file.filename
    }
})


module.exports = router;
