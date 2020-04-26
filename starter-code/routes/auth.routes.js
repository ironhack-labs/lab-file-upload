const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const User = require('../models/User.model')
const Post = require('../models/Post.model')
const uploadCloud = require('../configs/cloudinary.config')

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') })
})

router.post(
  '/login',
  ensureLoggedOut(),
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  })
)

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') })
})

router.post(
  '/signup',
  ensureLoggedOut(),
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
)

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user,
  })
})

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/post', (req, res) => res.render('authentication/post'))

router.post('/post', uploadCloud.single('picName'), async (req, res) => {
  const { content } = req.body
  const { url: picPath, originalname: picName } = req.file
  await Post.create({
    content,
    creatorId: req.user.id,
    picName,
    picPath,
  })
  res.redirect('/')
})

module.exports = router
