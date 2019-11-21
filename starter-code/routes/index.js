const express = require('express');
const router = express.Router();
const Post = require('../models/post');

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'File-upload' });
});

router.get('/', (req, res, next) => {
  Post.find().then(elements => {
    res.render('index', {
      title: 'File-upload',
      elements
    })
  })
});

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('new', {
    title: 'File upload'
  });
});

router.post('/new', uploadCloud.single('image'), ensureLoggedIn('/login'), (req, res, next) => {
  Post.create({
    creatorId: req.user.id,
    content: req.body.content,
    imgURL: req.file.url,
    imgName: req.file.originalname
  }).then(()=>res.redirect('/'))
});

module.exports = router;
