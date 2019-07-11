const express = require('express');
const passport = require('passport');
const multer = require('multer');
const uploadCloud = require('../config/cloudinary.js');
// const upload = multer({ dest: './public/uploads/' });
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comments');

// show all posts
router.get('/posts', (req, res) => {
  Post.find()
    .then((data) => {
      console.log(data)
      res.render('posts/index', { data });
    })
    .catch(err => console.log(err));
});

// create a post
router.get('/posts/create', ensureLoggedIn('/login'), (req, res) => {
  res.render('posts/create', req.user);
});

router.post('/posts', ensureLoggedIn('/login'), uploadCloud.single('picPath'), (req, res) => {
  const { content, creatorId, picName, picPath, creatorName } = req.body;
  const newPost = new Post({
    content,
    creatorId,
    picName,
    picPath: req.file.url,
    creatorName,
  });
  newPost.save()
    .then((data) => {
      res.redirect('/posts');
    })
    .catch(err => console.log(err));
});

// show one post
router.get('/posts/:id', ensureLoggedIn('/login'), (req, res) => {
  const postID = req.params.id;
  const loggedUser = req.user;
  Post.findById(postID)
    .then((data) => {
      // Comment.find({ postID: postID })     COMENTEI PORQUE AINDA NAO FUNCIONA
      //   .then(res => console.log(res))
      //   .catch();
      res.render('posts/post-page', { data, loggedUser });
    })
    .catch(err => console.log(err));
});

// post comment
router.post('/posts/comments', uploadCloud.single('imagePath'), (req, res) => {
  const { content, authorId, imageName, imagePath, authorName, postID } = req.body;
  const newComment = new Comment({
    content,
    authorId,
    imageName,
    imagePath: req.file.url,
    authorName,
    postID,
  });
  newComment.save()
    .then((data) => {
      res.redirect(`/posts/${req.body._id}`);
    })
    .catch(err => console.log(err));
});


module.exports = router;
