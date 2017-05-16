const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const path       = require('path');
const multer     = require('multer');
const Post       = require('../models/post.js');
const Comment    = require('../models/post.js');

const myUploader = multer({ dest: path.join(__dirname, '../public/uploads')
});

router.get('/post/new', ensureLoggedIn(), (req, res, next) => {
  res.render('posts/new-post.ejs');
});

router.post('/post/new', ensureLoggedIn(), myUploader.single('postPicPath'), (req, res, next) => {

  const thePost = new Post({
    content: req.body.postContent,
    creatorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.body.postPicName
  });
  thePost.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/profile');
  });
});

router.get('/post/index', (req, res, next) => {
  Post.find({},
  (err, postList) => {
    if (err) {
      next(err);
      return;
    }
    res.render('posts/index.ejs', {
      posts: postList
    });
  });
});

router.get('/post/:id/new-comment', ensureLoggedIn(), (req, res, next) => {
  const postId = req.params.id;

  Post.findById(postId, (err, thePost) => {
    if(err){
      next(err);
      return;
    }
    res.render('posts/new-comment.ejs', {
      post: thePost
    });
  });
});

router.post('/post/:id/new-comment', ensureLoggedIn(), myUploader.single('commentImgPath'), (req, res, next) => {
  const postId = req.params.id;

  const theComment = new Comment({
    content: req.body.commentContent,
    imagePath: `/uploads/${req.file.filename}`,
    imageName: req.body.commentImgName,
    creatorId: req.user.id,
  });

  console.log(`COMMENT: ${theComment}`);

  Post.findByIdAndUpdate(postId, {$push: {comments: theComment}}, (err, thePost) => {
    console.log(`THE POST: ${thePost}`);
    if(err){
      next(err);
      return;
    }
    res.redirect('/post/index');
  });
});


module.exports = router;
