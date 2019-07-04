const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");

/* GET home page */
router.get('/', (req, res, next) => {
  Post.
  find()
  .then(postWall => {
    res.render('index', {Posts: postWall});
  })
  
});



module.exports = router;