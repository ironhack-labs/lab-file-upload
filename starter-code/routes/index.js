const express = require('express');
const router  = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .populate('creatorId')
    .then( posts => {
      console.log(posts)
        res.render("index", {posts});
    })


  // res.render('index', { });
});


module.exports = router;
