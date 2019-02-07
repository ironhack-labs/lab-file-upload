const express    = require('express');
const router     = express.Router();
const Post = require("../models/posts.js")
const cloudinary = require("../utils/cloudinary.js")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/', (req, res,next) => {
    Post.find()
    .then(posts => {
        res.render('posts/list-posts',{posts});
    })
    .catch(err => console.log(err))
});
router.get('/add',ensureLoggedIn('/login'), (req, res,next) => {
    res.render('posts/addPosts');
});
router.post('/add',  cloudinary.single('image'),(req, res,next) => {
    const newPost = new Post({
        content: req.body.content,
        creatorId: req.user._id,
        picPath:  req.file.secure_url,
        picName: req.file.originalname
    })
    newPost.save()
    .then(() => {
        res.redirect("/posts")
    })
    .catch(err => console.log(err))
});

module.exports = router;