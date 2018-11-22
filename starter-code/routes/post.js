require('dotenv').config();

const express = require('express');

const postRouter = express.Router();

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const uploadCloud = require('../config/cloudinary');

const Post = require('../models/post');

postRouter.get('/', (req, res, next) => {
  Post.find()
  .populate('creatorId')
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
  };
  Post.create(newPost)
    .then(() => res.redirect('/posts'))
    .catch(err => next(err));
});

module.exports = postRouter;
