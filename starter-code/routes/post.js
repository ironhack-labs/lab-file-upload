var express = require('express');
var router = express.Router();
const Post = require('../models/post');
// const User = require('../models/user');
// Include multer middleware and indicate destination files
const multer = require('multer');
const upload = multer({dest: './public/uploads/'});
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// posts List  READ
router.get('/', (req, res, next) => {
  // Iteration #2
  Post.find({}, (err, posts) => {
    if (err) {
      return next(err);
    } else {
      res.render('index', {
        posts: posts
      });
    }
  });
});

//  Show template form adding
router.get('/post/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('post/newPost', {
    title: 'Create New Post'
  });
});

//  Adding new Post
router.post('/post/new',  upload.single('imgPost') , ensureLoggedIn('/login') ,(req, res, next) => {
  console.log('FILE',req.file);
  console.log('BODY',req.body);
  
  let post = new Post({
    content: req.body.content,
    creatorId: req.user._id,             // IMPORTANT USER ID LOGGED IN
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  post.save((err, post) => {
    res.redirect('/');
  });
});




module.exports = router;
