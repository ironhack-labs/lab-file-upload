const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");

/* GET home page. */
router.get('/', (req, res) => {
  console.log("entramos en profile");
  console.log(req.user);
  Post.find({username: req.user.username}).exec((err, posts) => {
    res.render("index", { title: 'Express - Generated with IronGenerator', posts: posts });
  });

});

module.exports = router;