const express = require('express');
const router  = express.Router();
var multer  = require('multer');
const Picture = require('../models/Picture');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
var upload = multer({ dest: './public/uploads/' });

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({}, (err, posts) => {
    res.render('index', { title: 'IronTumblr', posts, user : req.user});
  });
});

router.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/profile');
  });
});

router.post('/post/:id', upload.single('photo'), function(req, res){

  const post = new Post({
    content: req.body.content,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
    creatorId: req.params.id,
  });

  post.save((err) => {
      res.redirect('/profile');
  });
});

module.exports = router;
