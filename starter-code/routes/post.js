const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const upload = require('../config/cloudinary')
const Post               = require('../models/Post');

router.get('/post', async (req, res, next) => {
    const allPosts = await Post.find()

    res.render('/posts', allPosts)
})

router.post('/post', upload.single('picPath'), async (req, res, next) => {
    
    const {title, content} = req.body
    const { _id } = req.user

    
    const {originalname, secure_url} = req.file
    

    const newPost = await new Post({
        title,
        content,
        creatorId: _id,
        picName: originalname,
        picPath: secure_url
    })

    console.log(newPost)

    newPost.save((err) => {
        if (err){ next(null, false, { message: newPost.errors }) }
        return next(null, newPost);
    });

    const allPosts = await Post.find()

    res.render('/posts', {allPosts})
});

module.exports = router;