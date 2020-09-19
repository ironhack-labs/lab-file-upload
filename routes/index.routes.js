const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const path = require('path')
const Post = require('../models/Post')
const checkLogin = require('../configs/route-guard.config')

const uploadCloud = require('../configs/cloudinary')

/* GET home page */
router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('index', { posts })
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/post-form', checkLogin, (req, res, next) => {
  res.render('post-form')
})

router.post('/post-form', uploadCloud.single('picName'), (req, res) => {
  const {content} = req.body
  console.log(req.file)
  Post.create({content, picPath: req.file.path})
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router;