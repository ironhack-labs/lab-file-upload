const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.config')
const Post = require('../models/Post.model')

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login')



router.get('/', ensureLoggedIn(), (req, res) => {

  Post.find()
    .then(posts => res.render('posts/index', {
      posts,

    }))
    .catch(err => console.log(err))
})

router.get('/new', ensureLoggedIn(), (req, res) => {
  res.render('posts/new')
})

router.post('/new', [ensureLoggedIn('/login'), uploadCloud.single('pic')], (req, res) => {

  const {
    content,
    picName
  } = req.body
  const picPath = req.file.url
  const creatorId = req.user._id

  console.log(req.user._id)
  const newPost = new Post({
    content,
    picName,
    picPath,
    creatorId
  })

  newPost.save()
    .then(post => {
      console.log(post._doc)
      res.render('posts/show', {
        post: post._doc
      })

    })
    .catch(err => console.log(err))

})

module.exports = router;