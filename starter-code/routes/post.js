const express    = require('express');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const uploadCloud = require('../config/cloudinary.js');
const multer = require('multer');
const cloudinaryStorage = require('multer-storage-cloudinary');


router.get('/posts', ensureLoggedIn('/login'), (req, res) => {
  Post.find()
    .then(posts => {
      res.render('post/show', {posts});
    })
    .catch(err => console.log(err));
});

router.get('/post/new', ensureLoggedIn('/login'), (req, res) => {
  res.render('post/new', { message: req.flash('error'), user: req.user});
});


router.post('/post/new', uploadCloud.single('picture'), (req, res, next) => {
  const { content, creatorId } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newPost = new Post({content, creatorId, imgPath, imgName})
  newPost.save()
  .then(post => {
    res.redirect('/posts');
  })
  .catch(error => {
    console.log(error);
  })
});


router.get('/post/:postId', (req, res) => {
  const postId = req.params.postId;
  
  Post.findById(postId)
  .then(post => {
    console.log(post)
    Comment.find({ postId: post._id})
    .then(comment => {
      res.render('post/single', {post: post, user: req.user, comments: comment})
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

router.post('/post/:postId', uploadCloud.single('picture'), (req, res) => {
  const postId = req.params.postId;
  const authorId = req.body.authorId;
  const comment = req.body.comment;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newComment = new Comment({comment, authorId, postId, imgPath, imgName})
  const link = `/post/${postId}`;
  newComment.save()
  


  .then(post => {
    res.redirect('/posts');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;
