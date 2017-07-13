const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const express = require('express');
const passport = require('passport');
const router  = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/post/create-post',ensureLoggedIn('/login'),(req, res, next) => {
    res.render('posts/create-post');
  });

  router.post('/posts',ensureLoggedIn('/login') ,upload.single('photo'), (req, res, next) => {
    console.log(req.file);
    const post = new Post ({
      content: req.body.postName,
      creatorId: req.user._id,
      picPath: `uploads/${req.file.filename}`,
      picName: req.body.picName
    });
    post.save((err) => {
      res.redirect('/');
    });
  });

  router.get('/posts', ensureLoggedIn('/login'), (req,res,next) => {
    Post.find(
        // { creatorId: req.user._id },
        (err, postsList) => {
          if (err) {
            next(err);
            return;
          }

          /*der('posts/post-list.ejs', {
            posts: postsList,
          });*/
        }
      );
    }
  );


  router.get('/posts/:id', ensureLoggedIn('/login') ,(req, res, next) => {
    const postId = req.params.id;

    Post.findById(postId, (err, post) => {
      if (err) {
        next(err);
        return;
      }

      if(!post) {
        next();
        return;
      }
      console.log(post.comment);
      res.render('posts/post-show.ejs', {
        post: post

      });
    });
  });

  module.exports = router;
