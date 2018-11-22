require('dotenv');

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const uploadCloud = require('../config/cloudinary.js');


router.get('/', (req, res) => {
  
  Post.find()
  .then(posts => {

      if(req.user) {
        res.render('index', {posts, user: req.user})
      } else {
        res.render('index', {posts})
      }
    })
})

router.get('/userPosts', ensureLoggedIn('/'), (req, res) => {

  Post.find({creatorId: {$in : [req.user._id]}})
    .then(posts => {
      res.render('posts/userPosts', {posts})
    })
})  

router.get('/new', ensureLoggedIn('/'), (req, res) => {
  res.render('posts/new');
})

router.get('/show/:id', (req, res) => {
  Post.find({_id: req.params.id})
    .populate('comments')
    .then(post => {

      if(req.user) {
        res.render('posts/show', {post, user: req.user})
      } else {
        res.render('posts/show', {post})
      }
    })

})

router.post('/new', uploadCloud.single('photo'), (req, res) => {
  
  const picName = req.body.picName;

  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: req.file.url,
    picName: picName
  })

  newPost.save()
  .then(() => {
    res.render('posts/userPosts')
  })
})


router.post('/newComment/:id', uploadCloud.single('photo'), (req, res) => {
  


  const newComment = new Comment({
    content: req.body.content,
    creatorId: req.user._id,
    imagePath: req.file.url,
    imageName: req.file.originalname
  })



  newComment.save()
  .then((comment) => {
    Post.update({_id: req.params.id}, {$push: {comments: comment._id}})
    .then(()=> {
      res.redirect(`/show/${req.params.id}`)
    })
    
  })
})


module.exports = router;
