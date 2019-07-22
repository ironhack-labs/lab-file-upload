const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const { ensureLoggedIn } = require("connect-ensure-login")
const uploadCloud = require('../config/cloudinary')

router.get('/createPost', ensureLoggedIn("/login"), (req, res)=>{
  res.render("posts/create", {
    user: req.user
  })
})

router.post('/createPost', ensureLoggedIn('/login'),  uploadCloud.single("photo"), (req, res) => {
  //const { content, picPath, picName } = req.body
  const { creatorId } = req.user
  Post.create({...req.body})
  .then(post => {
    res.redirect(`/posts/${post._id}`)
  })
  .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.render('posts/postDetail', post))
  .catch(err => console.log(err))
})

module.exports = router