const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Post = require('../models/posts');
const Comment = require('../models/comment');

router.get('/posts', ensureLoggedIn('/login'), (req, res) => {
  Post.find()
    .then(posts => {
      posts.forEach(post => {
        post.picPath = post.picPath.slice(6);
      });
      res.render('authentication/posts', { posts });
    })
    .catch()
});

router.get('/create-post', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/create', { user: req.user });
});

router.post('/create-post', upload.single('photo'), ensureLoggedIn('/login'), (req, res) => {
  const { content, creatorID, picName } = req.body;
  const picPath = req.file.path;
  const newPost = new Post({ content, creatorID, picPath, picName });
  newPost.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

router.get('/edit/:postID', ensureLoggedIn('/login'), (req, res) => {
  const postID = req.params.postID;
  Post.findById(postID)
    .then(post => {
      post.picPath = post.picPath.slice(6);
      res.render('authentication/edit', { post });
    })
    .catch(err => console.log(err));
});

router.post('/edit/:postID', upload.single('photo'), ensureLoggedIn('/login'), (req, res) => {
  const postID = req.params.postID;
  let picPath = '';
  if (req.file === undefined) {
    picPath = 'public' + req.body.oldPicPath;
  } else {
    picPath = req.file.path;
  }
  const { content, picName } = req.body;
  Post.findByIdAndUpdate(postID, { $set: { content, picPath, picName } })
    .then(() => res.redirect('/posts'))
    .catch(err => console.log(err));
});

router.get('/view/:postID', ensureLoggedIn('/login'), (req, res) => {
  const postID = req.params.postID;
  Post.findById(postID)
    .then(post => {
      console.log(post);
      post.picPath = post.picPath.slice(6);
      res.render('authentication/view', { post });
    })
    .catch(err => console.log(err));
});

router.post('/comments/add/:postID', upload.single('photo'), ensureLoggedIn('/login'), (req, res, next) => {
  const { content, imageName } = req.body;
  const authorID = req.user;
  const postID = req.params.postID;
  let imagePath;
  if (req.file === undefined) {
    imagePath = '';
  } else {
    imagePath = req.file.path.slice(6);
  }
  const comment = new Comment({ content, authorID, imagePath, imageName })
  comment.save()
    .then((comment) => {
      Post.update({ _id: postID }, { $push: { comments: comment } })
        .then(post => {
          console.log(comment);
          
          res.redirect('/view/' + postID)
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch()
});

module.exports = router;