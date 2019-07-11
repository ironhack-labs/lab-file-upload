const express = require('express');
const router = express.Router();
const multer = require('multer');
const {ensureLoggedIn} = require('connect-ensure-login');
const Post = require('../models/post');
const Comment = require('../models/comment');
const upload = multer({
  dest: 'public/uploads/posts/'
});
const uploadComment = multer({
  dest: 'public/uploads/posts/comments/'
});
/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().populate('creator')
  .then(posts => {
    res.render('posts/index', {posts})})
  .catch(err => console.log(err))
});

router.get('/new', (req, res, next) => {
  res.render('posts/new');
});

/* create*/
router.post('/create', ensureLoggedIn('/login'), upload.single('photo'), (req, res, next) => {
  const {
    content,
    picName
  } = req.body;
  const picPath = 'uploads/posts/' + req.file.filename;
  const id = req.user.id;
  const picture = {picPath, picName};

  Post.create({content: content, creator: id, picture: picture})
  .then(() => res.redirect('/posts/'))
  .catch(err => console.log(err));
});

router.get('/show/:postId', (req, res, next) => {
  Post.findById(req.params.postId).populate('creator').populate({path: 'comments', populate: {path: 'author'}})
  .then(post => res.render('posts/show', post))
  .catch(err => console.log(err))

});

router.post('/show/:postId/comment', ensureLoggedIn('/login'), uploadComment.single('photo'), (req, res, next) => {
  const {comment, photoName} = req.body;
  let picture = {};
  if(req.file) {
    const picPath = 'uploads/posts/comments/' + req.file.filename;
    picture = {picPath: picPath, picName: photoName};
  }

  Comment.create({content: comment, author:req.user.id, picture: picture})
  .then((comment) => {
    console.log(comment);
    
    Post.findByIdAndUpdate(req.params.postId, {$push: {comments:comment._id}})
    .then(() => res.redirect('/posts/show/' + req.params.postId))})
    .catch(err => console.log(err))

  .catch(err => console.log(err));

});



module.exports = router;