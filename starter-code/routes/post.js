const express = require('express');
const router  = express.Router();
const Post = require('../models/Post');

/* CRUD -> CREATE FORM */
router.get('/newPost', (req, res) => {
  res.render('posts/new');
});

/* CRUD -> CREATE DATABASE */
router.post('/newPost', (req, res) => {
  const {content, picPath, picName } = req.body;

  const nwPst = {  
    content,
    creatorId: req.user.id,
    picPath,
    picName,
  }
  const newPost = new Post(nwPst);
  newPost.save( err => {
    if (err) { return next(err) }
    res.redirect('/');
  })
});

module.exports = router;