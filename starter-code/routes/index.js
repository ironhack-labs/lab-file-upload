const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Post = require('../models/post');
const User = require('../models/user');
const Coment = require('../models/coment');

//cloudinary
const uploadCloud = require('../helpers/cloudinary');

//completeBody
const {completeBodyPost} = require('../helpers/completeBody');

/* GET home page. */
router.get('/', ensureLoggedIn(), (req, res, next) => {
  req.app.locals.user = req.user;
  res.render('index', req.user);
});

router.get('/post/new', ensureLoggedIn(), (req, res, next)=>{
  res.render('new-post');
});

router.post('/post/new', ensureLoggedIn(), uploadCloud.single('picture'), completeBodyPost, (req,res,next)=>{
  Post.create(req.body)
    .then(result=>{
      User.findByIdAndUpdate(result.creatorId, { $push: { posts: result._id } }, {new: true})
        .then(newUser=>{
          res.redirect('/post/' + result._id);
        })
        .catch(e=>{
          res.send('post perdido en limbo');
        });
    })
    .catch(e=>{
      next(e);
    });
});

router.get('/post/:id', (req,res,next)=>{
  Post.findById(req.params.id)
    .populate('creatorId')
    .populate({
      path: 'comments',
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: 'creatorId' }
    })
    .then(post=>{
      res.render('post', post);
    })
    .catch(e=>{
      next(e);
    });
});

router.get('/posts', (req,res,next)=>{
  Post.find({})
    .populate('creatorId')
    .then(posts=>{
      res.render('posts-list', {posts});
    })
    .catch(e=>next(e));
});

router.post('/comment/:id', (req,res,next)=>{
  req.body.creatorId = req.user._id;
  req.body.postId = req.params.id;
  Coment.create(req.body)
    .then(result=>{
      Post.findByIdAndUpdate(req.body.postId, { $push: { comments: result._id } }, {new: true})
        .then(newPost=>{
          res.redirect('/post/' + req.body.postId);
        })
        .catch(e=>{
          res.send('comentario perdido en limbo');
        });
    })
    .catch(e=>next(e));
});

module.exports = router;
