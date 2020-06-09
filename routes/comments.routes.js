// routes/comments.routes.js

const { Router } = require('express');
const router = new Router();
const Post = require('../models/Post.model');
const Comments = require('../models/Comments.model');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/comments/' });

const routeGuard = require('../configs/route-guard.config');

router.post('/posts/comments/:id', routeGuard, upload.single("imageName"), (req, res) => {
    const content = req.body.content;
    let postId = req.params.id;
    const authorId = req.session.currentUser._id;
    const imageName = req.file.filename;
    const imagePath = req.file.path;

    Comments
    .create({
        content,
        authorId,
        imageName,
        imagePath
        })
        .then(comments => {
            return Post.findByIdAndUpdate(postId, { $push: {comments: comments.id} } )
        })
        .then(
            res.redirect(`/posts/detail/${postId}`) 
        )
        .catch((err)=> {
            console.log(err);
        })
});

module.exports = router;
