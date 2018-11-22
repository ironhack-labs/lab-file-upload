require('dotenv').config();
const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/post.js');
// todas las rutas entran  en /post
router.get('/', (req, res) => {
    console.log("entra post")
    res.render('post/pindex');
});
router.get('/new', (req, res) => {
    res.render('post/new', {
        message: req.flash('error')
    });
});

router.post('/new', uploadCloud.single('photo'), (req, res, next) => {
    const {
        content,
    } = req.body;
    const picPath = req.file.url;
    const picName = req.file.originalname;
    const newPost = new Post({
        content,
        creatorId:req.user._id,
        picPath,
        picName
    })
    newPost.save()
        .then(post => {
            console.log(post)
            res.redirect('/post');
        })
        .catch(error => {
            console.log(error);
        })
});

// router.get('/show', (req, res) => {
//     res.render('/post/show', { message: req.flash('error')});
// });
module.exports = router;