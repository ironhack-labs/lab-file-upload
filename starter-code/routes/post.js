const express = require('express');
const router  = express.Router();
const Post               = require('../models/post');
 /* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({}).then(posts => {
  
  res.render('post/index', {
    title: 'Home',
    user: req.user,
    posts,});
  })
});
 router.get('/new', (req, res, next) => {
  res.render("post/new")
});
 router.get('/show/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    res.render("post/show", {post})
  })
});
 router.post('/create', (req, res, next) => {
  const {content, picName} = req.body;
   req.files.picture.mv(`public/images/postPics/${req.files.picture.name}`)
   new Post({
    content,
    picName,
    picPath: `/images/postPics/${req.files.picture.name}`,
    creatorId: req.user._id,
    creatorName: req.user.username,
  }).save().then(post => {
    res.redirect("/post")
  })
});
 module.exports = router;