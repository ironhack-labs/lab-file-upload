require("dotenv")
const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary');
const Post = require('../models/post');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), uploadCloud.single('photo'), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post("/post", ensureLoggedIn('/login'), uploadCloud.single('photo'), (req, res) => {
    const {content} = req.body;
    const picPath = req.file.url;
    const picName = req.file.originalname;
    const creatorId = req.user._id

    Promise.resolve()
    Post.create({content, picPath, picName, creatorId})
    .then(() => res.redirect("/"))
})

router.post("/add-comment", ensureLoggedIn('/login'), uploadCloud.single('photo'), (req, res) => {
    const {content, postId} = req.body
    let url = req.file ? req.file.url: ""
    let originalName = req.file ? req.file.originalname: ""

    let comment = {
        content,
        authorId: req.user._id,
        imagePath: url,
        imageName: originalName
    }

    Post.findByIdAndUpdate(
        postId,
        {
            $push: {comments: comment}
        }
    )
    .then(() => res.redirect("/"))
})

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
