const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../helpers/cloudinary');
const {completeBodyPost} = require('../helpers/completeBody');


router.get('/post/:id', (req, res, next)=>{
  Post.findById(req.params.id)
  .populate('creatorId')
  .then(post=>{
    res.render('post', post);
  })
  .catch(e=>next(e))
});

router.post('/post/new', ensureLoggedIn(), uploadCloud.single('photo'), completeBodyPost, (req, res, next) => {
  Post.create(req.body)
  .then(result=>{
    User.findByIdAndUpdate(result.creatorId, {$push: {posts: result._id}}, {new: true})
    .then(newUser=>{
      res.redirect('/post/' + result._id)
    })
    .catch(e=>{
      res.send('no post created');
    })
  })
  .catch(e=>next(e))
});

router.get('/post/new', ensureLoggedIn(), (req, res) => {
  res.render('new-post');
});

router.get('/posts', (req,res,next) => {
  Post.find({})
  .populate('creatorId')
  .then(posts=>res.render('posts-list', {posts}))
  .catch(e=>next(e))
});

/* GET home page. */
router.get('/', ensureLoggedIn(), (req, res, next) => {
  req.app.locals.user = req.user;
  res.render('index', req.user);
});

module.exports = router;
