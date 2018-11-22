const express = require('express');
const passport = require('passport');
const postRouter = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/Post');



postRouter.get('/new', ensureLoggedIn(), (req, res) => {
  res.render('post/new', { message: req.flash('error') });
});

postRouter.post('/new', [ensureLoggedIn(), uploadCloud.single('img')], (req, res, next) => {
  let creatorId = req.user.id;

  const {
    content,
    picName
  } = req.body;

  let picPath = req.file.url;
  const newPost = new Post({
    content,
    picName,
    creatorId,
    picPath
  });

  newPost.save((err) => {
    if (err) { next(null, false, { message: newPost.errors }) }
    return next(null, newPost);
  });

  res.redirect('../');

})

postRouter.get('/:id',(req, res) => {
  console.log(req.params.id);
  Post.findById(req.params.id)
  .populate("creatorId", "username")
  .then((post)=>{
    console.log(post );
    res.render('post/show', {post});
  })
});




module.exports = postRouter;
