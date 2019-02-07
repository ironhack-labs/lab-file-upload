const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });
const Post = require('../models/post');

router.get('/newpost', (req, res, next) => {
  Post.find((err, post) => {
    res.render('newpost', {post})
  })
});

// post route (index.js)
router.post('/newpost', upload.single('photo'), (req, res) => {
  const post = new Post({
    content: req.body.content,
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  post.save((err) => {
    res.redirect('/');
  });
});


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express - Generated with IronGenerator'
  });
});


router.get('/show', (req, res, next) => {
  Post.find((err, post) => {
    res.render('show', { post });
  });
});

router.get('/addcomment/:id', (req, res, next) => {
  const postId = req.params.id;
  Post.findOne({ _id: postId })
    .then((post) => {
      res.render('addcomment', { post });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post('/addcomment', (req, res, next) => {
  const { comment } = req.body;
  Post.update({ _id: req.query.postId }, { $set: { comment } })
    .then((post) => {
      res.redirect('/show');
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;
