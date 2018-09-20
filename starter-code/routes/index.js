const express = require('express');
const router  = express.Router();
const Post = require("../models/post")

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then(posts => {
    console.log(posts)
    res.render('index', { title: 'Express - Generated with IronGenerator', posts });
  })
});



module.exports = router;
