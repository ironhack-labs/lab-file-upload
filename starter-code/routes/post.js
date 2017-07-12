const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');
const Post = require('../models/post');
const router = express.Router();
const postUpload = multer({ dest: './public/uploads/' });

router.get('/post/new',(req, res, next) => {
    res.render('posts/new-post.ejs');
  });

router.post('/posts', postUpload.single('postPhoto'), (req, res, next) => {
  console.log(req.file);
  post = new Post ({
    content: req.body.postName,
    creatorId: req.user._id,
    picPath: `uploads/${req.file.filename}`,
    picName: req.body.picName
  });
  post.save((err) => {
    res.redirect('/');
  });
});

router.get('/posts', (req,res,next) => {
  Post.find(
      // { creatorId: req.user._id },
      (err, postsList) => {
        if (err) {
          next(err);
          return;
        }

        res.render('posts/post-list.ejs', {
          posts: postsList,
        });
      }
    );
  }
);


module.exports = router;
