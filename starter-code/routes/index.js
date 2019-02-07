const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({
  dest: './public/uploads/'
})
const Post = require('../models/post')
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find()
  .then(posts => res.render('index', { posts }))
  .catch(next)  
});

router.get('/new', function(req, res, next) {
  res.render('new-post')
});

router.get('/show/:id', function(req, res, next) {
  Post.findOne({_id: req.params.id})
  .then(post => res.render('post-show', { post }))
  .catch(next)
});

module.exports = router;