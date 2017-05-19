const express  = require('express');
const ensure   = require('connect-ensure-login');
const multer   = require('multer');
const router   = express.Router();
const path     = require('path');
const Post     = require('../models/post.js');
const Comment  = require('../models/comments.js');


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
  // ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    Post.find(
      // { creatorId: req.user._id },
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

router.get('/posts/my-posts',
  ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    Post.find(
      { creatorId: req.user._id },
      (err, postsList) => {
        if (err) {
          next(err);
          return;
        }

        res.render('posts/my-posts-view.ejs', {
          posts: postsList,
          successMessage: req.flash('success')
        });
      }
    );
  }
);

router.get('/posts/:id', (req, res, next) => {
  const postId = req.params.id;

  Post.findById(postId, (err, thePost) => {
    if (err) {
      next(err);
      return;
    }

    if(!thePost) {
      next();
      return;
    }

    res.render('posts/post-show.ejs', {
      post: thePost
    });
  });
});


router.post('/posts/:id/delete', (req, res, next) => {
  ensure.ensureLoggedIn('/login');
  const postId = req.params.id;
  console.log(req.params.id);

  Post.findByIdAndRemove(postId, (err, thePost) => {
    if(err) {
      next(err);
      return;
    }
    res.redirect('/posts/my-posts');
  });
});

router.get('/posts/:id',
  ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    const postId = req.params.id;

    Post.findById(postId, (err, thisPost) => {
      if (err) {
        next(err);
        return;
      }

      res.render('/posts/add-comment.ejs', {
        post: thisPost
      });
    });
  }
);

router.post('/posts/:id',
  ensure.ensureLoggedIn('/login'),
  myUpload.single('imagePath'),
  (req, res, next) => {
    const postId = req.params.id;
    const comment = new Comment({
      content: req.body.contentName,
      authorId: req.user._id,
      imagePath: `/uploads/post-pics/${req.file.filename}`,
      imageName: req.body.imageName,
    });

    Post.findOneAndUpdate (
      postId,
      {$push: {comments: comment}},
      (err, thePost) => {
        if (err) {
          next(err);
          return;
        }

        thePost.save((err) => {
          if (err) {
            next(err);
            return;
          }
          res.redirect('/posts');
        });
      }
    );
  }
);



module.exports = router;
