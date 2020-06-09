// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const mongoose = require('mongoose');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/post/' });

const routeGuard = require('../configs/route-guard.config');

router.get('/posts/create', routeGuard, (req, res) => {
    res.render('posts/post-form');
});

router.post('/posts/create', upload.single("picName"), (req, res) => {
    const content = req.body.content;
    const creatorId = req.session.currentUser._id;
    const picName = req.file.filename;
    const picPath = req.file.path;
    Post.create({
        content,
        creatorId,
        picName,
        picPath
    })
        .then(post => {
            res.redirect(`/posts/detail/${post._id}`) 
        })
        .catch((err)=> {
            console.log(err);
        })
});

router.get('/posts', (req, res) => {
    Post.find({})
        .populate("creatorId")
        .then(post=>{
            res.render('posts/post-list', {post});
        })
        .catch(err=>{
            console.log(err);
        })
});

router.get('/posts/detail/:id', (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
    .populate("creatorId")
    .then(post=>{
        res.render('posts/post-detail', {post});
    })
    .catch(err=>{
        console.log(err);
    })
});

module.exports = router;
