const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");


/* GET home page. */
/* router.get('/', (req, res, next) => {
  res.render('index')
}); */

router.get('/', (req, res, next) => {
  Post.find()
  .then(posts => res.render('index', {posts}))
});

module.exports = router;
