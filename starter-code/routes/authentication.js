const express = require('express');
const passport = require('passport');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/post');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Comment = require('../models/comment');



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

router.post('/signup', [ensureLoggedOut(), uploadCloud.single('imgName')], passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}))

router.post('/profile', [ensureLoggedIn(), uploadCloud.single('imgName')], (req, res, next) => {
    const idUser = req.user.id;
    const description = req.body.imgDesc;
    const originalname = req.file.originalname;
    const url = req.file.url;

    const newPost = new Post({
        idUser,
        description,
        originalname,
        url
    })
    newPost.save()
        .then(post => {
            res.redirect('/profile');
        })
        .catch(err => console.log(err));
});

router.post('/profile/comment', ensureLoggedIn(), (req, res, next) => {
    const authorId = req.user.id;
    const content = req.body.comment;
    console.log(req.body);
    const newComment = new Comment({
        content,
        authorId,
    })



    newComment.save()
        .then(comment => {
            Post.findByIdAndUpdate({ _id: req.body.postId }, { $push: { comments: comment._id } })
                .then(() => {
                    res.redirect('/');
                })
        })
        .catch(err => console.log(err));
});




router.get('/profile', ensureLoggedIn('/login'), (req, res) => {

    Post.find({ idUser: req.user._id })
        .then(post => {
            res.render('authentication/profile', { post, user: req.user });
        })
        .catch(error => {
            console.error(err);
            next(err);
        })

});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
