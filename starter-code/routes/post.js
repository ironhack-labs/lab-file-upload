const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/pictures');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const upload = multer({
    dest: './public/uploads/'
});
const mongoose = require('mongoose');
const {
    ensureLoggedIn
} = require('connect-ensure-login');

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('post/new');
});

router.post('/create', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
    const pic = new Picture({
        _id: new mongoose.Types.ObjectId(),
        path: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname
    });

    pic.save((err) => {
        if (err) return next(err);
        const post = new Post({
            content: req.body.content,
            creatorId: req.user._id,
            picture: pic._id
        });
        post.save((err) => {
            if (err) return next(err);
            res.redirect('/');
        });
    });
});

router.get('/show/:postId', (req, res, next) => {
    Post.findById(req.params.postId).populate('picture').populate({
        path: 'comments',
        model: 'Comment',
        populate: {
            path: 'picture',
            model: 'Picture'
        }
    }).exec((err, post) => {
        if (err) return next(err);
        console.log(post);
        res.render('post/show', {
            post
        });
    });
});

router.post('/comments/:postId', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
    Post.findById(req.params.postId, (err, post) => {
        if (err) return next(err);

        var pic = new Picture({
            _id: new mongoose.Types.ObjectId(),
            path: `/uploads/${req.file.filename}`,
            originalName: req.file.originalname
        });

        pic.save((err) => {
            if(err) return next(err);

            var comment = new Comment({
                content: req.body.content,
                authorId: req.user._id,
                picture: pic._id
            });
    
            comment.save(err => {
                if (err) return next(err);
    
                post.comments.push(comment);
    
                post.save(err => {
                    if (err) return next(err);
                    res.redirect('/show/' + req.params.postId);
                });
            });
        })

        

    });




    // Post.findById(req.params.postId).populate('picture').exec((err, post) => {
    //     if(err) return next(err);
    //     res.render('post/show', { post });
    // });
});

module.exports = router;