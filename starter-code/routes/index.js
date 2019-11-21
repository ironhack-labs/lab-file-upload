const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const uploadCloud = require('../config/cloudinary');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().then(posts => {
    res.render('index', {
      title: 'Express - Generated with IronGenerator',
      posts
    })
  })
});

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('new', {
    title: 'Express - Generated with IronGenerator'
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