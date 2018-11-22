const express             = require('express');
//const uploadCloud         = require('../config/cloudinary.js');
const Post                = require('../models/post');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then(posts => {
    res.render('index',  {posts});
  })
  .catch(err=> {});
});

module.exports = router;
