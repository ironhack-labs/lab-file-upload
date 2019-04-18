const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const User   = require('../models/user');
const Post   = require('../models/post');
const Comment   = require('../models/comment');
// const session            = require('express-session');
// const MongoStore         = require('connect-mongo')(session);
// const mongoose           = require('mongoose');
// const bodyParser         = require('body-parser');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .populate('user')
  .then((posts) => {
    res.render('index', {posts});
  })
});

router.get('/newPost', ensureLoggedIn('/login'), (req,res,next) => {
  res.render('post/new');
});

router.post('/newPost', upload.single('picPath'), (req,res,next) => {
  let content = req.body.content;
  let picName = req.body.picName;
  let post = new Post({
     content,
     creatorId: req.user.id,
     picPath: `/uploads/${req.file.filename}`,
     picName 
  })
  post.save()
  .then(res.redirect('/'));
});


router.post('/comment/:postId', upload.single('picPath'), (req,res,next) => {
  let content = req.body.content;
  let picName = req.body.picName;
  
  let comment = new Comment({
     content,
     authorId: req.user.id,
     picPath: `/uploads/${req.file.filename}`,
     picName 
  })

  Post.findByIdAndUpdate(req.params.postId, {$push:{comments:comment}})
  .then(
    comment.save()
      .then(res.redirect('/'))
  )
  
});

module.exports = router;
