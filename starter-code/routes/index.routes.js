const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const Post = require('../models/Post.model')

/* GET home page. */
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('creatorId')
  res.render('index', { posts })
})

module.exports = router
