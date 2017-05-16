const express = require('express');
const router = express.Router();
const Post = require('../models/post-model.js');
const User = require('../models/user.js');
const comment = require('../models/comment-post.js');

const ensure = require('connect-ensure-login');
router.get('/create', ensure.ensureLoggedIn('/login'), (req, res, next) => {
    res.render('posts/new-post');
});
const multer = require('multer');
const path = require('path');

const myUploader = multer({
    dest: path.join(__dirname, '../public/post')
});
router.post('/post/new', ensure.ensureLoggedIn('/login'), myUploader.single('picPath'), (req, res, next) => {

    const newPost = new Post({
        content: req.body.content,
        creatorId: req.user._id,
        picPath: `/post/${req.file.filename}`,
        picName: req.body.picName
    });
    newPost.save((err) => {
        if (err) {
            next(err);
            return;
        }
        res.redirect('/');
    });
});
router.get('/:id/postpage', (req, res, next) => {
    const postId = req.params.id;
    Post.findById(postId, (err, found) => {
        if (err) {
            next(err);
            return;
        }

        if (found) {
            User.findById(found.creatorId, (err, theUser) => {
                if (err) {
                    next(err);
                    return;
                }
                if (theUser) {
                    // User.findById(found.comment.authorId,(err,commentUser)=>{

                      res.render('posts/post-page', {
                        post: found,
                        users: theUser
                      });
                    // });
                }
            });
        }
    });

});
const myComments = multer({
    dest: path.join(__dirname, '../public/comments')
});
router.post('/:id/new/comment', ensure.ensureLoggedIn('login'), myComments.single('imagePath'), (req, res, next) => {
    const commentid = req.params.id;
    Post.findById(commentid, (err, post) => {
        if (err) {
            next(err);
            return;
        }
        if (post) {
            const newComment = new comment({
                content: req.body.content,
                authorId: req.user._id,
                imagePath: `/comments/${req.file.filename}`,
                imageName: req.body.imageName
            });
            post.comment.push(newComment);
            post.save((err) => {
                if (err) {
                    next(err);
                    return;
                }
                res.redirect(`/${post._id}/postpage`);
            });
        }
    });
});

module.exports = router;
