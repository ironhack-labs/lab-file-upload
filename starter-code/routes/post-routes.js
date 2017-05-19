const express  = require('express');
const ensure   = require('connect-ensure-login');
const multer   = require('multer');
const router   = express.Router();
const path     = require('path');
const Post     = require('../models/post.js');


router.get('/posts/new',
// We need to be logged in to create posts
  ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    res.render('posts/new-post.ejs');
  }
);

const myUpload = multer({
  dest: path.join(__dirname, '../public/uploads/post-pics/')
});

router.post('/posts',
  ensure.ensureLoggedIn('/login'),
  myUpload.single('postPhoto'),

  (req, res, next) => {
    console.log(req.file);

    const thePost = new Post({
      content: req.body.postName,
      creatorId: req.user._id,
      picPath: `/uploads/post-pics/${req.file.filename}`,
      picName: req.body.picName
    });

    thePost.save((err) => {
      if (err) {
        next(err);
        return;
      }

      req.flash('success', 'Your post was saved succesfully');
      res.redirect('/');
    });
  }
);

router.get('/posts',
  ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    Post.find(
      { creatorId: req.user._id },
      (err, postsList) => {
        if (err) {
          next(err);
          return;
        }

        res.render('posts/posts-list-view.ejs', {
          posts: postsList,
          successMessage: req.flash('success')
        });
      }
    );
  }
);

module.exports = router;
