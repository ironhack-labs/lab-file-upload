const express = require('express');
const router  = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', (req, res, next) => {
  let username = req.user.username;
  Post.find()
  .then(posts => res.render('index', {name: username, posts: posts}))  
});

router.get("/post/:picId", (req, res, next) => {
  Post.findById({_id: req.params.picId})
  .then(post => res.render("post", {post}))
})

module.exports = router;
