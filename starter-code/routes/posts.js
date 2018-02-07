const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/create', ensureLoggedIn('/login'), (req, res, next) => {
    res.render('posts/create', { user: req.user });
})
router.post('/create', ensureLoggedIn('/login'), (req, res, next) => {
    
    const newPost = new Post({
        content: req.body.content,
        creatorId: req.user._id,
        creator:req.user.username
    })
    newPost.save((err, post) => {
        if (err) {
            throw err;
        }
        console.log(`Post saved ${post.content}`)

        res.redirect("/");
    })
});


module.exports = router;






