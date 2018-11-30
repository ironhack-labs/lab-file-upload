const express = require('express');
const router = express.Router();
const multer = require('multer')
const uploader = multer({ dest: './public/posts' })
const Posts = require('../models/Post')
const User = require('../models/User')

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('profile/profile');
});

router.post('/new', uploader.single('image'), (req, res, next) => {
    const { path, filename } = req.file
    const { content } = req.body
    console.log(path)
    const newPost = {
        content: content,
        creatorId: "5c004f6beec47219eafffe86",
        picPath: '/posts/' + filename,
        filename: filename,
    }
    Posts.create(newPost)
        .then(result => {
            User.findByIdAndUpdate("5c004f6beec47219eafffe86", { $push: { posts: result._id } })
                .then(user => {
                    res.redirect('/')
                }).catch(err => console.log(err))
        }).catch(err => console.log(err))
})
module.exports = router;
