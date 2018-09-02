const express = require('express');
const router  = express.Router();
const Post               = require('../models/post');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({}).then(posts => {
  
  res.render('post/index', {
    title: 'Dashboard',
    user: req.user,
    posts,});
  })
});

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render("post/new")
});

router.get('/show/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    res.render("post/show", {post, user: req.user})
  })
});

router.post('/create', ensureLoggedIn('/login'),(req, res, next) => {
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

router.post('/show/:id/comment/new', ensureLoggedIn('/login'), (req, res, next) => {
  
   const {content, picName} = req.body;

   console.log(content, picName)

   console.log(req.params.id)

   if(req.files.picture) {
   req.files.picture.mv(`public/images/commentPics/${req.files.picture.name}`)

  Post.findByIdAndUpdate(req.params.id, {$push: {comments: {
      content,
      picName,
      picPath: `/images/commentPics/${req.files.picture.name}`,
      creatorId: req.user._id,
      creatorName: req.user.username,
     }}}, {new: true}).then(post => {
       res.redirect(`/post/show/${req.params.id}`)
     })
    }

    else {
      Post.findByIdAndUpdate(req.params.id, {$push: {comments: {
        content,
        creatorId: req.user._id,
        creatorName: req.user.username,
       }}}, {new: true}).then(post => {
         res.redirect(`/post/show/${req.params.id}`)
       })
      }
    
    
});

module.exports = router;
