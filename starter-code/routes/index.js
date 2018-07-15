const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');


/* GET home page. */
router.get('/', (req, res) => {
  Post.find()
    .then( (posts) => {
      res.render('index', {posts});
    })
    .catch( (err) => {
      console.log(err);
    });
});

module.exports = router;
