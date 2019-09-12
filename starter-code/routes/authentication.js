const express = require('express')
const passport = require('passport')
const router = express.Router()
const multer = require('multer')
const User = require('../models/user')
const Post = require('../models/Post')
const Picture = require('../models/Picture')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const upload = multer({ dest: './public/uploads/' })

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') })
})

router.post(
  '/login',
  ensureLoggedOut(),
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') })
})

router.post(
  '/signup',
  ensureLoggedOut(),
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })
)

router.get('/profile', ensureLoggedIn('/login'), async function(req, res) {
  const pictures = await User.findById(req.user._id).populate('profilePicture')
  res.render('authentication/profile', {
    user: req.user,
    pictures: pictures.profilePicture
  })
})

router.get('/:id/upload', ensureLoggedIn('/login'), async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  // const authors = await Author.find()
  // book.authors = authors
  res.render('authentication/update-profile', user)
})

router.post('/:id/:whatever/upload', ensureLoggedIn('/login'), upload.single('profilePicture'), async (req, res) => {
  try {
    const { id } = req.params //user Id
    const pic = await Picture.create({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    })
    const picId = pic._id
    await User.findByIdAndUpdate(id, { profilePicture: picId })
    res.redirect('/profile')
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id/post', ensureLoggedIn('/login'), async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.render('authentication/new-post', user)
})

router.post('/:id/postNew', ensureLoggedIn('/login'), upload.single('postPicture'), async (req, res) => {
  try {
    const { id } = req.params //user Id
    console.log(id)
    const pic = await Picture.create({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    })
    const picId = pic._id
    console.log(id + ',' + picId)
    await Post.create({ createdBy: id }, { profilePicture: picId })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
