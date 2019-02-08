const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const post       = require('../models/post')
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/post.js');


router.get('/', (req, res, next) => {
    res.render('post/postList');
});

router.get('/newPost', (req, res, next) => {
    res.render('post/newPost');
});

router.post('/newPost', [uploadCloud.single('photo')], (req, res) =>{
    console.log(req)
    const newPost = new post({
        content : req.body.content,
        creatorId : req.user._id, 
        picPath: req.file.secure_url,
        picName: req.file.originalname
    })
    newPost.save((err) => {
        if (err){ next(null, false, { message: newUser.errors }) }
        return next(null, newPost);
    });
})
  
  module.exports = router;
  