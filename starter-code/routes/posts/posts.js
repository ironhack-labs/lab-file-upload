const express = require('express');
const router  = express.Router();
const Post = require('../../models/Post')
const Comment = require('../../models/Comment')
// const User = require('../models/User')
const multer = require('multer')
const uploader = multer({dest: './public/pics'})
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/detail/:id', ensureLoggedIn('/login'), (req, res, next) => {
  Post.findById(req.params.id).populate('creatorId')
  .then(post=>{
    const comments = []
    post.comments.forEach(element => {
      Comment.findById(element).populate('authorId')
      .then(c=>{
        comments.push(c)
      })
      .catch(err=>{
        console.log(err)
      })
    });
    res.render('posts/detail',{post, comments})
  })
  .catch(err=>{
    console.log(err)
  })
});

router.get('/', (req, res, next) => {
  Post.find().populate('creatorId')
  .then(posts=>{
    res.render('posts/list',{posts})
  })
  .catch(err=>{
    console.log(err)
  })
});

router.post('/new', ensureLoggedIn('/login'), uploader.single('image'), (req, res, next) => {
  // console.log(req.file)
  // console.log(req.user)
  if(req.file){
    const p = {
      content:req.body.content,
      creatorId:req.user._id,
      picPath: '/pics/' + req.file.filename,
      picName:req.file.originalname
    }
    Post.create(p)
    .then(post=>{
      // res.json(post)
      res.redirect('/posts')
    })
    .catch(err=>{
      console.log(err)
    })
  } 
})

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('posts/new')
});

module.exports = router;