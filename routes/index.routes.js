const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose');
const fileUploader = require('../configs/cloudinary.config')


/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

router.get('/post-form', (req,res) => {
  res.render('post-form')
})

router.post('/post-form', fileUploader.single('image'), (req,res) => {
const { picName, creatorId, content } = req.body
const picPath = req.file.path
Post.create({content, creatorId, picPath , picName })
.then(() => {
  res.redirect('/posts')
})

})

router.get('/posts', (req,res) => {
Post.find()
  .then(posts => {
    console.log(posts)
  res.render('posts', {posts})
})
})

router.get('/post-details', (req,res) => {
  res.render('post-details')
})


module.exports = router;
