const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().exec((err, data) => {
    res.render('index', {
      user: req.user,
      posts: data,
      title: 'IronTumblr'
    });
  })
});


/* CRUD -> UPDATE POST POST FORM to db */
router.post('/', (req, res) => {
  /* console.log(req.body.comment);
  console.log(req.body.authorId);
  console.log(req.body.authorName); */
  const {
    comment,
    authorId,
    authorName,
    postId
  } = req.body;

  const updates = {
    comment,
    authorId,
    authorName,
    postId
  };
  console.log(updates);
/*
  Post.findByIdAndUpdate(postId, updates, (err, product) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  }); */
})

module.exports = router;