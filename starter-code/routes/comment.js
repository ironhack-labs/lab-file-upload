const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
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
  res.render('comment/new-comment')
})

router.post('/new', uploadCloud.single('image'), async (req, res) => {
  const { content } = req.body
  /**********************************************/
  /************* CLOUDINARY CONFIG ***************/
  /**********************************************/
  const imageName = req.file.originalname
  const imagePath = req.file.url

  await Comment.create({ content, imageName, imagePath })
  res.redirect('/')
})

module.exports = router
