const express = require('express');
const router = express.Router();
// const User = require('../models/User.js');
// const Post = require('../models/Post.js');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Tumblr Wannab'
  });
});




module.exports = router;