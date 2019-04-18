const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const Post = require('../models/Post');
const upload = multer({ dest: './public/uploads/'});

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('index',{posts});
    });
});

router.get('/post/new', (req, res, next) => {
  res.render('post/new');
});

router.post('/post/new', ensureLoggedIn(), upload.single('image'), (req, res, next) => {
  const url = req.file.path.replace(/^public/, '');
  Post.create({
    content: req.body.content,
    creatorId: req.user._id,
    picName: req.body['image-name'],
    picPath: url
  })
  .then(() => res.redirect('/'))
  .catch(err => console.error(err));
});

module.exports = router;
