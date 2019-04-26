const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const uploadCloud = require('../helpers/cloudinary')

router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => res.render('posts/posts', { posts }))
    .catch(err => console.log(err))
})

router.get('/posts/new', isLogged, (req, res, next) => {
  const config = {
    action: '/posts/new',
    title: 'New Post!',
    post: {}
  }
  res.render('./posts/new', config)
})

router.post('/posts/new', isLogged, uploadCloud.single('picName'),(req, res, next) => {
  Post.create({ ...req.body, creatorId: req.user._id, picPath: req.file.secure_url, picName: req.file.originalname })
    .then(post => {
      res.render('./post/posts', { message: `You've created a new post` })
    })
    .catch(err => console.log(err))
})

router.get('/posts/:id/edit', (req, rest, next) => {
  const { id } = req.params
  Post.findById(id)
    .then(post => {
      const config = {
        action: '/edit',
        title: 'Edit Post!',
        post
      }
      res.render('./new', config)
    })
    .catch(err => console.log(err))
})

router.post('/posts/:id/edit', (req, res, next) => {
  const { id } = req.params
  Post.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true })
    .then(post => res.render(`/${post._id}`))
    .catch(err => console.log(err))
})

router.get('/posts/:id/delete', (req, res, next) => {
  const { id } = req.params
  Post.findByIdAndRemove(id)
  .then(() => res.redirect('/posts'))
  .catch(err => console.log(err))
})

router.get('/posts/:id', (req, res, next) => {
  const { id } = req.params
  Post.findById(id)
    .populate({
      path: 'creatorId',
      model: 'User'
    })
    .populate({
      path: 'comments',
      model: 'Comment'
    })
    .then(post => res.render('posts/post', post))
    .catch(err => console.log(err))
})

router.post('/posts/:id/comment', isLogged, uploadCloud.single('imageName'), (req, res, next) => {
  const { id } = req.params
  Comment.create({ ...req.body, authorId: req.user._id, imagePath: req.file.secure_url, imageName: req.file.originalname })
    .then(comment => {
      Post.findByIdAndUpdate(id, { comments: comment._id }, { new: true })
        .then(() => res.redirect(`/posts/${id}`))
        .catch(err => console.log(err))
    }) 
    .catch(err => console.log(err))
})

function isLogged(req, res, next) {
  if(!req.isAuthenticated()) return res.redirect('/login')
  next()
}

module.exports = router