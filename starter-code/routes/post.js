const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Posts = require('../models/post');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const hbs = require('hbs');

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
      console.log("Post inserted succesfully");
      res.redirect('/post');
    })
})

router.get('/post/comment/:id', ensureLoggedIn(), (req, res, next) => {
  Posts.findById(req.params.id).then(post => {
  res.render('post/com', {post});
  
})

  router.post('/post/comment/:id', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
  Posts.findByIdAndUpdate(req.params.id)
  .then( post => {
    post.comments.push({
      comcontent:req.body.content,
      authorId: req.user._id,
      comimagePath: `uploads/${req.file.filename}`,
      comimageName: req.file.originalname
    })
    console.log(post)
    console.log("Post commented succesfully");
    res.redirect('/post');
  }) 
  .catch(error => console.log(error));
  });
});

module.exports = router;

// parent.children.push({ name: 'Liesl' });
// var subdoc = parent.children[0];
// console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
// subdoc.isNew; // true