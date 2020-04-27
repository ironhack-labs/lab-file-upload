require('dotenv').config()
const express = require('express')
const passport = require('passport')
const router = express.Router()

const { userLogged } = require('../middlewares/checkActiveSession')

const User = require('../models/User.model.js')
const Post = require('../models/Post.model.js')
const Comment = require('../models/Comment.model.js')
const uploadCloud = require('../configs/cloudinary.js')

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

router.get('/create', userLogged, (req, res) => res.render('post/create'))

router.post('/create', uploadCloud.single('picPath'), async (req, res) => {
  console.log(req.file)
  const { originalname: picName, url: picPath } = req.file
  console.log(req.body)
  const { content } = req.body
  console.log(req.user)
  const { id: creatorId } = req.user
  const createdPost = await Post.create({ content, creatorId, picPath, picName })
  res.redirect('/')
})

router.get('/comment/:id', (req, res) => res.render('post/comment', req.params))

router.post('/comment/:id', uploadCloud.single('imagePath'), async (req, res) => {
  console.log(req.file)
  const { originalname: imageName = 0, url: imagePath = 0 } = req.file
  console.log(req.body)
  const { content } = req.body
  console.log(req.user)
  const { id: authorId } = req.user
  console.log(req.params)
  const { id: postId } = req.params
  const createdComment = await Comment.create({
    content,
    authorId,
    postId,
    imagePath,
    imageName,
  })
  console.log(createdComment)
  res.redirect('/')
})

router.get('/details/:id', async (req, res) => {
  const { id: postId } = req.params
  const postComments = await Comment.find({ postId }).populate('authorId', 'username -_id')
  console.log(postComments)
  res.render('post/details', { postComments })
})
module.exports = router
