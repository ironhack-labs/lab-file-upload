require('dotenv').config();

const uploadCloud = require('../config/cloudinary');

const Post = require('../models/post');

const Comment = require('../models/comment');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const express = require('express');

const postRouter = express.Router();

postRouter.get('/', (req, res, next) => {
  Post.find()
    .populate('creatorId')
    .populate({ path: 'comments', populate: { path: 'authorId' } })
    .then(posts => res.render('posts/index', { posts }))
    .catch(err => next(err));
});

postRouter.get('/new', (req, res, next) => res.render('posts/new'));

postRouter.post('/new', ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
  const newPost = {
    content: req.body.content,
    creatorId: req.body.creatorId,
    picPath: req.file.url,
    picName: req.file.originalname,
    comments: [],
  };

  Post.create(newPost)
    .then(() => res.redirect('/posts'))
    .catch(err => next(err));
});

postRouter.post('/newComment', uploadCloud.single('photo'), (req, res, next) => {
  const newComment = {
    content: req.body.commentText,
    authorId: req.user.id,
  };
  if (req.file) {
    newComment.imagePath = req.file.url;
    newComment.imageName = req.file.originalname;
  }
  Comment.create(newComment)
    .then((myComment) => {
      Post.findByIdAndUpdate(req.body.postId, { $push: { comments: myComment.id } })
        .then(() => res.redirect('/posts'))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

module.exports = postRouter;
