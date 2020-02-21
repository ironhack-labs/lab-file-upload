const express = require('express');
const passport = require('passport');
const router = express.Router();
const uploadCloud = require('../../configs/cloudinary.config');
const Post = require('../../models/Post.model');


/* GET home page. */
router.get('/post', (req, res) => {
    res.render('user/post-form');
});

router.post('/create-post', uploadCloud.single('image'), (req, res, next) => {
    const { content, picName } = req.body;
    Post.create({
        content,
        creatorId: req.user._id,
        picPath: req.file.url, 
        picName
    })
    .then(post => {
        console.log('New Post: ', post);
        res.render('auth/profile', { posts: post });
    })
    .catch(err => next(err));
});

router.get('/post-details', (req, res, next) => {
    const { post_id } = req.query;
    Post.findById(post_id)
    .populate('creatorId')
    .then(foundOne => {
      //   console.log('foundOne: ', foundOne);
      const { _id, content, creatorId, picPath, picName } = foundOne;
      const newObj = {
        postId: _id,
        picPath,
        picName,
        content,
        userId: creatorId._id,
        username: creatorId.username,
        userEmail: creatorId.email,
        userImg: creatorId.path,
      };
      res.render('user/post-details', newObj);
    })
    .catch(err => console.log(err));
});

module.exports = router;
