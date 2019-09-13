const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

router.get('/', async (req, res) => {
  const posts = await Post.find()
  const comments = await Comment.find()
  res.render('post/posts-list', { posts, comments })
})

router.get('/private', isLoggedIn, (req, res) => {
  res.render('private')
})

module.exports = router
