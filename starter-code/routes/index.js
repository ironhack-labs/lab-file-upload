const express = require('express')
const router  = express.Router()
const Post    = require('../models/post')
const User    = require('../models/user')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then(posts => {
      // let postWithCreator = []
      posts.forEach(post => {
        // post.creator = User.findById(post.creatorId)
        // console.log(post.creator);})
      res.render('index', {
        welcome: 'Welcome to IronTumblr',
        posts: posts,
        user: req.user
      })})})
    .catch(err => console.log(err))
})


module.exports = router
