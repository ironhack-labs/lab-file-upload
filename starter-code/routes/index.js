const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");

/* GET home page. */
router.get('/', (req, res) => {

  Post.find().exec((err, posts) => {
    res.render("index", { title: 'Express - Generated with IronGenerator', posts: posts });
  });

});

module.exports = router;
