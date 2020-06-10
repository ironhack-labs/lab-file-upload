const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });


router.get('/', (req, res, next) =>{
    Post.find({})
        .populate('users')
        .then((posts) => {
            res.render('index', { posts: posts });
        })
        .catch(error => {
            console.log(error);
        });
});

router.post('/', upload.single('postPicture'), (req, res, next) => {
    const newPost = req.body;

    Post.create({
            content: newPost.content, 
            creatorId: newPost.creatorId,
            picPath: `/uploads/${req.file.filename}`,
            picName: req.file.originalname
        })
        .then( () =>{
            res.redirect('/');
        });
});

module.exports = router;
