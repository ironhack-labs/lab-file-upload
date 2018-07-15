const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
//const Comment = require('../models/comment')


router.get('/post/new', ensureLoggedIn(), (req, res, next) => {
  res.render('newPost');
})

router.post('/post/new', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: `uploads/${req.file.filename}`,
    picName: req.file.originalname
  });

  newPost.save()
    .then( () =>{
      console.log("Post inserte succesfully");
      res.redirect('/');
    })
})

router.get('/post/:id', (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then( (post) => {
      res.render('showPost', {post});
    })
    .catch( (err) => {
      console.log(err);
    });
});

module.exports = router;