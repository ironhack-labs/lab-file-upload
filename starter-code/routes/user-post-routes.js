const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');

//Post from user profile
router.get('/profile/post', (req, res, next) => {
  res.render('users/post-form');
});
router.post('/profile/post', uploadCloud.single('photo'), (req, res, next) => {
  const { content, picName } = req.body;
  //   creatorId, picPath,
  Post.create({
    content,
    creatorId: req.user._id,
    picPath: req.file.url,
    picName,
  })
    .then(savedPost => {
      //   console.log('savedPost: ', savedPost);
      res.redirect('/'); //goes to index.hbs
    })
    .catch(err => console.log(err));
});

//Get post details
router.get('/post-details', (req, res, next) => {
  //post_id coming from index.hbs, from each each post detail (a tag)
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
      res.render('users/post-details', newObj);
    })
    .catch(err => console.log(err));
});

module.exports = router;
