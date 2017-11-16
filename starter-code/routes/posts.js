const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const uploadsDir = '/uploads/post-pictures/';
const upload = multer({ dest: "." + uploadsDir});
const Post = require('../models/Post');
//const Comment = require('../models/Comment');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/post/new', ensureLoggedIn(), (req, res) => {
  res.render('post/new', {user: req.user});
});

router.post('/post/new', [upload.single('picture'), ensureLoggedIn()], (req, res, next) => {
  const postInfo = {
    title: req.body.title,
    content: req.body.content,
    creatorId: req.user._id,
    picPath: `${uploadsDir}${req.file.filename}`,
    picName: req.file.originalname
  };
  const newPost = new Post(postInfo);
  newPost.save()
    .then((post) => {
      return res.redirect(`/post/show/${post.id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/post/show/:id', (req, res, next) => {
  const postID = req.params.id;
  Post.findById(postID)
    .then((post) => {
      res.render('post/show', {post, user:req.user});
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/post/show/:id', [upload.single('picture'), ensureLoggedIn()], (req, res, next) => {
  const postID = req.params.id;
  let imgPath, imgName;
  if (req.file) {
    imgPath = `${uploadsDir}${req.file.filename}`;
    imgName = req.file.originalname;
  }
  const commentData = {
    content: req.body.content,
    authorId: req.user._id,
    imagePath: imgPath,
    imageName: imgName
  };
  Post.findById(postID, (err, post) => {
    post.comments.push(commentData);
    post.save()
      .then((post) => {
        return post;
      })
      .catch((err) => {
        next(err);
      });
  })
    .then((post) => {
      res.render('post/show', {post, user:req.user});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
