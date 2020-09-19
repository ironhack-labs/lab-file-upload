const express = require('express');
const { format } = require('morgan');
const router = express.Router();
const isLoggedin = require('../middleware/isLogggedin');
const PostModel = require('../models/Post.model');
const uploadCloud = require('../configs/cloudinary');
const { find } = require('../models/Post.model');


/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

router.get('/create-post', (req, res, next) => {
  res.render('users/create-post')
})
router.get('/user-posts', (req, res, next) => {
  //res.render("users/user-profile")
  PostModel.find()
    .then((data) => {
      console.log(data)
      res.render('users/user-posts', {data})
    })
})

router.post('/create-post', uploadCloud.single('picFile'),  (req, res, next) => {
  console.log('ind 24')
  const { content, picName } = req.body
  console.log(req.body)
  console.log(req.file)
  PostModel.create({content, picName, picPath: req.file.path})
  .then((data) => {
    res.render("users/user-posts")
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router;
