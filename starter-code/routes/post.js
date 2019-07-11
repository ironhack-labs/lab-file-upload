const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

router.get('/post', ensureLoggedIn(), (req, res, next) => {
  res.render('./post/index');
});

router.post('/post', ensureLoggedIn(), upload.single('picPath'), (req, res, next) => {

  const newPost = new Post({
    photo: {
      picName: req.body.picName,
      picPath: `/uploads/${req.file.filename}`,
    },
    content: req.body.content,
    owner: req.user.id,
  })

  newPost.save()
    .then(answer => res.redirect('/display'))
    .catch(err => console.log(err));

});

router.get('/display', ensureLoggedIn(), (req, res, next) => {
  Post.find()
    .then(answer => {
      res.render('./post/display', { answer })
    })
    .catch()
});

router.get('/show/:id', ensureLoggedIn(), (req, res) => {


  Post.findById(req.params.id)
    .then((answer) => {
      Comment.find({ postId: req.params.id })
        .then(comment => res.render('./post/show', { answer, comment }))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));


})

router.post('/show/:id', ensureLoggedIn(), upload.single('picPath'), (req, res, next) => {

  const newComment = new Comment({
    photo: {
      picName: req.body.picName,
      picPath: `/uploads/${req.file.filename}`,
    },
    content: req.body.content,
    author: req.user.id,
    postId: req.params.id,
  });

  newComment.save()
    .then(answer => res.redirect(`/show/${req.params.id}`))
    .catch(err => console.log(err));

});
module.exports = router;