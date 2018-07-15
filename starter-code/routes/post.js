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
    .populate('creatorId', 'username')
//    .populate('comments.authorId', 'username')
    .sort({updated_at: -1})
    .then( (posts) => {
      res.render('post/list', {posts});
    })
    .catch( (err) => {
      console.log(err);
    });
});

router.get('/post/newPost', ensureLoggedIn(), (req, res, next) => {
  res.render('post/newPost');
});

router.post('/post/newPost', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
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
    });
});

router.get('/comments/:id', ensureLoggedIn(), (req, res, next) => {
  Posts.findById(req.params.id)
    .populate('creatorId', 'username')
    .then( (post) => {
      res.render('post/newComment', post);
    })
    .catch( (err) => {console.log(err)});
});

router.post('/comments/:id/newComment', upload.single('image'), (req, res, next) => {

  newComent = {
    content: req.body.content,
    authorId: req.params.id
  }
  if (req.file){
    newComent.imagePath = `uploads/${req.file.filename}`;
    newComent.imageName = req.file.originalname;
  }

  Posts.findById(req.params.id)
  .then((post) => {
    post.comments.push(newComent);
    post.save()
      .then( () =>{
        res.redirect('/post');
      });
    });
});

router.get('/post/delete/:id', (req, res, next) => {
  console.log ("in delete")
  Posts.findByIdAndRemove(req.params.id)
    .then( (post) => {
      console.log("Post deleted");
      res.redirect("/profile");
    })
})
module.exports = router;