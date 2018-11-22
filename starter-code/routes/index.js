require('dotenv');

const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const uploadCloud = require('../config/cloudinary.js');

// /* GET home page. */
// router.get("/", isLoggIn, (req, res, next) => {

//   Post.find().then(posts => {
//     console.log(req.user);
//     res.render("index", { posts, user:req.user });
//   })
//   .catch(err => {console.log(err)});
// });


router.get('/', (req, res) => {
  
  Post.find()
  .then(posts => {
      console.log(posts);
      if(req.user) {
        res.render('index', {posts, user: req.user})
      } else {
        res.render('index', {posts})
      }
    })
})

router.get('/userPosts', ensureLoggedIn('/'), (req, res) => {
  console.log(req.user._id);
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
    .then(post => {
      if(req.user) {
        res.render('posts/show', {post, user: req.user})
      } else {
        res.render('posts/show', {post})
      }
    })

})

router.post('/new', uploadCloud.single('photo'), (req, res) => {
  
  console.log('hola');
  console.log(req.body)

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


module.exports = router;
