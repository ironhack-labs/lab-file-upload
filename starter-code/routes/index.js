const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");


/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().sort({created_at: -1}).exec((err, posts) => {
    res.render('index', {posts});
  }); 
});

module.exports = router;
