const express = require('express');
const router = express.Router();
const path = require('path');
const debug = require('debug')(`linkedin:${path.basename(__filename).split('.')[0]}`);
const User = require('../models/user');
const Post = require('../models/Post');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

/* RENDER NEW POST FORM */
router.get('/new-post', ensureAuthenticated, (req, res, next) => {
    console.log(req);
    const userId = req.user._id;
    const userName = req.user.username;
    
    res.render('post', {
        title: "New post",
        userId: userId,
        userName: userName
    });
});


/* CRUD -> CREATE POST */
router.post('/new-post', (req, res) => {
    const {
        content,
        creatorId,
        creatorName
    } = req.body;
    const newPost = new Post({
        content,
        creatorId,
        creatorName
    });
    console.log(newPost);
    newPost.save(err => {
        if (err) {
            return next(err)
        }
        res.redirect('/');
    })
});


/* CRUD -> UPDATE POST GET FORM*/
router.get('/edit-post/:postId', (req, res) => {
    const postId = req.params.postId;
    Post.findById(postId, (err, post) => {
        if (err) {
            return next(err);
        }
        res.render('edit-post', {
            title: "Edit post",
            post: post,
            user:req.user
        });
    });
})


module.exports = router;