const express    = require('express');
const passport   = require('passport');
const session            = require('express-session');
const uploadCloud = require('../config/cloudinary.js');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User               = require('../models/user');
const Post               = require('../models/post');
const Comment      = require('../models/comment');

router.get('/createPost', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/createPost');
});

router.post('/createPost', [ensureLoggedIn(), uploadCloud.single('photo')], (req, res) => {
    const creatorId = req.user._id;
    console.log(creatorId);
    const content = req.body.content;
    const picPath = req.file.url;
    const picName = req.file.originalname;

    const newPost = new Post({content, creatorId, picPath, picName})

    newPost.save()
    .then(post => {
        res.redirect('/');
    })
    .catch(error => {
        console.log(error+'Post del post');
    })
});

router.get('/createComment/:id', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/createComment', {idpost:req.params.id});
});

router.post('/createComment/:id', [ensureLoggedIn(), uploadCloud.single('photo')], (req, res) => {
    const authorId = req.user._id;
    const content = req.body.content;
    const imagePath = req.file.url;
    const postId = req.params.id;
    const imageName = req.file.originalname;
    const newComment = new Comment({content, authorId, imagePath, imageName, postId})
    console.log(newComment);

    newComment.save()
    .then(comment => {
        res.redirect('/');
    })
    .catch(error => {
        console.log(error+'Post del comment');
    })
});

module.exports = router;