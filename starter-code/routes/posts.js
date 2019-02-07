const express = require('express');
const router = express.Router();
const postModel = require('../models/post');
const commentModel = require('../models/comment');
const cloudinary = require('../options/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  postModel
    .find({})
    .populate('comments', {})
    .then((posts) => res.render('post/list-post', { posts }))
    .catch((err) => console.log('An error ocurred finding post', err));
});

router.get('/add', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('post/add-post');
});

router.post('/add', cloudinary.single('photo'), (req, res, next) => {
  const newPost = new postModel({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: req.file.secure_url,
    picName: req.file.originalname,
  });
  newPost.save().then(() => {
    res.redirect('/posts/').catch((err) => {
      console.log('An error was ocurred');
    });
  });
});

router
  .post('/add-comment/:id', cloudinary.single('photo'), (req, res, next) => {
    const newComment = new commentModel({
      content: req.body.content,
      authorId: req.user._id,
      imagePath: req.file.secure_url,
      imageName: req.file.originalname,
    });
    newComment
      .save()
      .then((comment) => {
        postModel
          .findByIdAndUpdate(req.params.id, {
            $push: { comments: comment._id },
          })
          .then(() => {
            console.log('a comment was saved succesfully');
          res.redirect('/posts/');
      })
      .catch(err => console.log('An error ocurred refering a comment'));
  })
  .catch((err) => console.log('An error ocurred saving a comment in db', err));
});

module.exports = router;
