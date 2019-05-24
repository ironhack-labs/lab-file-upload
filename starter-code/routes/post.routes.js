const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.config')
const Post = require('../models/Post.model')

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login')

const isLogged = req => req.user ? true : false

router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.render('posts/index', {
      posts,
    }))
    .catch(err => console.log(err))
})

router.get('/new', ensureLoggedIn(), (req, res) => {
  res.render('posts/new')
})

router.post('/new', [ensureLoggedIn('/login', {
  msg: 'no estas logueado'
}), uploadCloud.single('pic')], (req, res) => {

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

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.render('posts/show', {
      post,
      isLogged: isLogged(req)
    }))
    .catch(err => console.log(err))
})

/* Comments routes */

router.post('/:id/comment', uploadCloud.single('pic'), (req, res) => {

  const {
    content,
    imageName
  } = req.body

  const imagePath = req.file.url

  const update = {
    $push: {
      comments: {
        content,
        imageName,
        imagePath,
        authorId: req.user._id
      }
    }
  }

  Post.findByIdAndUpdate(req.params.id, update)
    .then(post => {
      console.log('Find by id and update:', post)
      res.redirect(`/posts/${req.params.id}`)
    })
    .catch(err => console.log(err))
})


module.exports = router;