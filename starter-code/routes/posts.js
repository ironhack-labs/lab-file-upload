const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const cloudinaryConfig = require('../config/cloudinary.config')

const Post = require('../models/post')
const User = require('../models/user')

router.get('/list', (req, res) => {
  Post.find()
    .then(allPost => res.render("posts/post-list", {
      allPost, User: req.user
    }))
    .catch(err => console.log('error:', err))

})

router.get('/add', (req, res) => res.render("posts/post-add"))

router.post('/add', cloudinaryConfig.single('photo'), (req, res) => {
  console.log("entra aqui")
  const { content } = req.body
  const picPath = req.file.url
  const picName = req.file.originalname

  const newPost = new Post({ content, picPath, picName })
  console.log("newPost")

  newPost.save()
    .then(x => res.redirect('list'))
    .catch(err => console.log('Error!:', err))
})

router.get('/detail/:post_id', (req, res) => {
  Post.findById(req.params.post_id)

    .then(thePost => res.render('posts/post-detail', { post: thePost }))
    .catch(error => console.log(error))
})

//router.post('/detail', ensureLoggedIn())



module.exports = router
router.post('/add', cloudinaryConfig.single('photo'), (req, res) => {
  console.log("entra aqui")
  const { content } = req.body
  const picPath = req.file.url
  const picName = req.file.originalname

  const newPost = new Post({ content, picPath, picName })
  console.log("newPost")

  newPost.save()
    .then(x => res.redirect('list'))
    .catch(err => console.log('Error!:', err))
})