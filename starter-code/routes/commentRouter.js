const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const Comment = require('../models/comment');
const Post = require('../models/post');

router.post('/create', [upload.single('picture'), ensureLoggedIn()], (req, res, next) => {
    const {content, postId} = req.body;

    const newComment = new Comment({
        content,
        authorId: req.user._id,
    })

    if(req.file){
        newComment.picture = {
            path: `/uploads/${req.file.filename}`,
            originalName: req.file.originalname
        }
    }

    newComment.save()
    .then(() => {
        return Post.findById(postId);
    })
    .then(post => {
        post.comments.push(newComment);
        return post.save();
    })
    .then(() => res.redirect(`/post/${postId}`))
    .catch(err => next(err));
})

module.exports = router;