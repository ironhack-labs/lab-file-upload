const Post = require('../models/post');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const { ensureLoggedIn } = require('connect-ensure-login');

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('posts/new', { user: req.user });
});

router.post('/new', ensureLoggedIn('/login'), upload.single('postpic'), (req,res, next) => {
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: 'uploads/' + req.file.filename,
    picName: req.file.originalname,
  });

    newPost.save( (err) => {
      if(err){
        return next(err)
      }
      return res.redirect('/');
    });
  });

module.exports = router;
