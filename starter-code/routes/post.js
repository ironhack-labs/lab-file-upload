const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Posts = require('../models/post');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});

router.get('/post', (req, res) => {
  Posts.find()
    .then( (posts) => {
      res.render('post/list', {posts});
    })
    .catch( (err) => {
      console.log(err);
    });
});

router.get('/post/new', ensureLoggedIn(), (req, res, next) => {
  res.render('post/new');
})

router.post('/post/new', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
  const newPost = new Posts({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: `uploads/${req.file.filename}`,
    picName: req.file.originalname
  });

  newPost.save()
    .then( () =>{
      console.log("Post inserte succesfully");
      res.redirect('/post');
    })
})
module.exports = router;