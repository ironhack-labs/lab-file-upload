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
  const author = req.user.username
  const picPath = req.file.url
  Post.create({...req.body, picPath, author})
  .then(post => {
    res.redirect(`/posts/${post._id}`)
  })
  .catch(err => console.log(err))
})

router.get('/:id', ensureLoggedIn('/login'), (req, res) => {
  Post.findById(req.params.id)
  .then(post => res.render('posts/postDetail', post))
  .catch(err => console.log(err))
})

router.post('/:id', (req, res) => {
  const { id } = req.params
  const { username } = req.user
   const {content}= req.body
  Post.findByIdAndUpdate(id , {$push: {comments:{content, author: username}}})
  .then(post => res.redirect(`/posts/${id}`))
  .catch(err=> console.log(err))
})

module.exports = router