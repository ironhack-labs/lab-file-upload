const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const Post = require('../models/Post');
const upload = multer({ dest: './public/uploads/'});
const Comment = require('../models/Comment');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('index',{posts, user: req.user});
    });
});

router.get('/post/new', (req, res, next) => {
  res.render('post/new');
});

router.post('/post/new', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
  const url = req.file.path.replace(/^public/, '');
  Post.create({
    content: req.body.content,
    creatorId: req.user._id,
    picName: req.body['image-name'],
    picPath: url
  })
  .then(() => res.redirect('/'))
  .catch(err => console.error(err));
});

router.get('/post/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      res.render('post/show', {post, user: req.user});
    })
    .catch(err => console.error(err));
});

router.post('/post/:id/newComment', upload.single('image'), (req, res, next) => {
  var url = req.file.path.replace(/^public/, '');
  var comment = new Comment({
    content: req.body.content,
    imagePath: url,
    authorId: req.user._id
  });
  Post.findById(req.params.id)
    .then(post => {
      post.comments.push(comment);
      post.save();
      res.redirect(`/post/${req.params.id}`);
    });
});

module.exports = router;