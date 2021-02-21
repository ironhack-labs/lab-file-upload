const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post.model');


/* GET home page */
router.get('/', (req, res) => {
  Post.find({})
  .then(posts => {
    res.render('index', { posts, title: 'lab-file-upload 🚀' })
  })
});

/* GET post page */
router.get('/post/:id', (req, res) => {
  let id = req.params.id;
  Post.findOne({ _id: id })
    .then(post => {
      console.log(post)
      res.render('posts/view', { post })
    })
    .catch(error => next(error));

  });


module.exports = router;
