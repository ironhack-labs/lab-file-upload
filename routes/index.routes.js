const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');

/* GET home page */
router.get('/', 
(req, res) => {
  Post.find({})
  .then(post => {
    res.render('index', { post });
  })
  .catch(error => console.error(error));
});


module.exports = router;
