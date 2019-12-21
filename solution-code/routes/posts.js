const express = require('express');
const router = express.Router();

const Post = require('../models/post.js');

const uploadCloud = require('../config/cloudinary.js')

router.get('/new', function (req, res, next) {
  if (!req.user) {
    res.redirect('/login');
    return;
  }

  res.render('posts/new');
});

router.post('/', uploadCloud.single('pic'), function (req, res, next) {
  if (!req.user) {
    return next(new Error('You must be logged to create a post'));
  }

  Post.create({
    content: req.body.content,
    creatorId: req.user.id,
    picPath: req.file.url,
    picName: req.file.originalname
  })
    .then(post => res.redirect('/'))
    .catch(next)
  ;
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  Post.findById(id)
    .populate('comments.authorId')
    .then(post => {
      console.log('post', post.comments);

      res.render('posts/show', {
        post: post,
        user: req.user
      });
    })
    .catch(next);
  ;
});

router.post('/:id/comments', uploadCloud.single('image'), function (req, res, next) {
  if (!req.user) return next(new Error('You must be logged to create a comment'));

  const id = req.params.id;

  Post.update({ _id: id }, { $push: { comments: {
    content: req.body.content,
    authorId: req.user.id,
    imagePath: req.file.url,
    imageName: req.file.originalname
  }}})
    .then(book => {
      res.redirect(`/posts/${id}`);
    })
    .catch(next)
  ;
})

module.exports = router;