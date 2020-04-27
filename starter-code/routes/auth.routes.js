require('dotenv').config()
const express = require('express')
const passport = require('passport')
const router = express.Router()

const { userLogged } = require('../middlewares/checkActiveSession')

const User = require('../models/User.model.js')
const uploadCloud = require('../configs/cloudinary.js')

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

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
  uploadCloud.single('photo'),
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  })
)

router.get('/profile', userLogged, (req, res) => {
  res.render('authentication/profile', {
    user: req.user,
  })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
