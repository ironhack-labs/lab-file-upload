const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const secure = require("../middlewares/secure.middleware");

/* GET home page */
router.get('/', (req, res) => {
  Post.find().limit(15)
  .then(posts => {
    console.log(posts)
    res.render('index', { title: 'App created with Ironhack generator 🚀', posts })
  })
});


// GET POST FORM

router.get('/post',(req, res, next) => {
  res.render('posts/create-post')
} )


router.post('/create-post', upload.single('image'), (req, res, next) => {
  req.body.creatorId = req.session.currentUser._id
  req.body.picPath = `/uploads/${req.file.filename}`
  Post
    .create(req.body)
    .then(() => {
      res.redirect('/')
    })
    .catch(e => next(e))
});

router.get('/post/:id', (req, res, next) => {
  Post
    .findById(req.params.id)
    .then((post) => {
      res.render('posts/post-details', post)
    })
    .catch(e => next(e))
});

module.exports = router;
