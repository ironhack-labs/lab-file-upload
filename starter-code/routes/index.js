const express = require('express');
const router  = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.user){Post.find()
  .then(posts => res.render('index', {user: req.user, posts: posts}))}
  else{
    Post.find()
  .then(posts => res.render('index', {posts: posts})) 
  } 
});

router.get("/post/:picId", (req, res, next) => {
  if (req.user){Post.findById({_id: req.params.picId})
  .then(post => res.render("post", {name: req.user.username, post: post}))}
  else {Post.findById({_id: req.params.picId})
  .then(post => res.render("post", {post}))}
  
})

module.exports = router;
