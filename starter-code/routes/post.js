const express = require('express');
const passport = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './uploads/post' });
const Post = require('./../models/post');

router.get('/post/index', (req, res, next) => {
  let userId = req.user.id;

  Post.find({'creator': userId}, (error, posts) => {
    if (error) { return next(error); }
    return res.render('post/index', {posts});
  });
});

router.get('/post/show/:id', (req, res, next) => {
  let postId = req.params.id;

  Post.findOne({'_id': postId}, (error, post) => {
    if (error) { return next(error); }
    return res.render('post/show', post);
  });
});

router.get('/post/create', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('post/new');
});

router.post('/post/create', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
  const newPost = new Post({
    creator: req.user.id,
    content: req.body.content,
    picPath: `/uploads/post/${req.file.filename}`,
    picName: req.file.originalname
  });

  newPost.save((error) => {
    if (error) { return next(error); }
    return res.redirect('/post/index');
  });
});

module.exports = router;
