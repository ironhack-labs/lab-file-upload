require('dotenv').config()
const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../models/User.model.js')
const Post = require('../models/Post.model.js')
const uploadCloud = require('../configs/cloudinary.js')

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

/* GET home page. */
router.get('/', async (req, res) => {
  const allPosts = await Post.find({}).populate('creatorId', 'username')
  //console.log(allPosts)
  res.render('index', { allPosts })
})

module.exports = router
