const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const cloudinaryStorage = require('multer-storage-cloudinary');
const uploadCloud = require('../configs/cloudinary.config');

const Post = require('../models/post');

router.get('/post', ensureLoggedIn('/login'), (req, res) => {
    Post.find()
        .then(posts => {
            res.render('post/show', { posts });
        })
        .catch(err => console.log(err));
});

router.get('/post', ensureLoggedIn('/login'), (req, res) => {
    res.render('post/new', { message: req.flash('error'), user: req.user });
});


router.post('/post', uploadCloud.single('photo'), (req, res, next) => {
    const { content, creatorId } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    const newPost = new Post({ content, creatorId, imgPath, imgName })
    newPost.save()
        .then(post => {
            res.redirect('/post');
        })
        .catch(error => {
            console.log(error);
        })
});


module.exports = router;
