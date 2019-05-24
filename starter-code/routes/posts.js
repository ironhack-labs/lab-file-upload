const express = require('express');
const Post = require('../models/Post');
const uploadCloud = require('../config/cloudinary.config');
const router = express.Router();

router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.render('posts/show-all', {
      posts
    }))
    .catch(err => console.log('Error!:', err))
})

router.get('/new', (req, res) => res.render('posts/new'))

router.post('/new', uploadCloud.single('photo'), (req, res) => {
  const {
    title,
    description
  } = req.body
  const picPath = req.file.url
  const picName = req.file.originalname

  const newPost = new Post({
    title,
    description,
    picPath,
    picName
  })

  newPost.save()
    .then(x => res.redirect('/'))
    .catch(err => console.log('Error!:', err))
})






module.exports = router