const express   = require('express');
const ensure    = require('connect-ensure-login');
const multer    = require('multer');
const path      = require('path');

const Post = require('../models/post');
const router = express.Router();


router.get('/posts/new',
  // need to be logged in to create post
  ensure.ensureLoggedIn('/login'),

  (req, res, next) => {
    res.render('posts/new-post-view.ejs');
  }
);


const myUploader = multer({
  dest: path.join(__dirname, '../public/uploads')
});

// <form method="post" action="/post">
router.post('/posts',
  // need to be logged in to create posts
  ensure.ensureLoggedIn('/login'),

  // <input type="file" name="roomPhoto">
  myUploader.single('postPhoto'),

  (req, res, next) => {
    // req.file is your file object no matter what the input name is
    console.log('');
    console.log('*************** UPLOAD FILE OBJECT ***************** ');
    console.log(req.file);
    console.log('');

    const thePost = new Post({
      content: req.body.postContent,
      picName: req.body.pictureName,
      picPath: `/uploads/${req.file.filename}`,
      creatorId: req.user._id
    });

    thePost.save((err) => {
      if (err) {
        next(err);
        return;
      }

      req.flash('success', 'Your post was saved successfully.');

      res.redirect('/posts');
    });
  }
);


router.get('/posts',
  ensure.ensureLoggedIn(),

  (req, res, next) => {
    Post.find(
      { creatorId: req.user._id },

      (err, postsList) => {
        if (err) {
          next(err);
          return;
        }

        res.render('posts/post-list-view.ejs', {
          posts: postsList,
          successMessage: req.flash('success')
        });
      }
    );
  }
);


module.exports = router;