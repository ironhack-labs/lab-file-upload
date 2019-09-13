const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
/**********************************************/
/************* UPLOADING CONFIG ***************/
/**********************************************/
const uploadCloud = require('../config/cloudinary')

/*****************************************/
/************* MIDDLEWARE ***************/
/****************************************/
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

router.get('/new', isLoggedIn, (req, res) => {
  res.render('post/new-post')
})

router.post('/new', uploadCloud.single('postPicture'), async (req, res) => {
  const { content } = req.body
  /**********************************************/
  /************* CLOUDINARY CONFIG ***************/
  /**********************************************/
  const picName = req.file.originalname
  const picPath = req.file.url

  await Post.create({ content, picName, picPath })
  res.redirect('/')
})

module.exports = router
