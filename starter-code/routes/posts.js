const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads' });

const Post = require("../models/post");

router.get('/posts/new', ensureLoggedIn('/login'), (req, res) => {
  res.render('posts/new', {});
});

router.get('/posts/:id', ensureLoggedIn('/login'), (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    res.render('posts/show', {
      post: post
    })
  });
});

router.post('/posts/create', upload.single('photo'), ensureLoggedIn('/login'), (req, res) => {
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.file.originalname
  });

  newPost.save((err) => {
    res.redirect('/');
  });
});


router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
