const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');

const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const Post = require('../models/post');

const Comment = require('../models/comment');

router.post('/newComment', [upload.single('photo'), ensureLoggedIn('/login')], (req, res, next) => {
    const {content, postId} = req.body;

    const newComment = new Comment({
        content,
        authorId: req.user._id,
    })

    if(req.file){
        newComment.imagePath = `/uploads/${req.file.filename}`;
        newComment.picName =  req.file.originalname
    }

    newComment.save()
    .then(() => {
        return Post.findById(postId);
    })
    .then(post => {
        post.comments.push(newComment);
        return post.save();
    })
    .then(() => res.redirect(`/${postId}`))
    .catch(err => next(err));
})

module.exports = router;