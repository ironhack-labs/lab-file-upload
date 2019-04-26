const express = require('express')
const router = express.Router()
const passport = require('../helpers/passport')
const User = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')

router.get('/signup', (req, res, next) => {
  const config = {
    title: 'Sign up!',
    action: '/signup',
    sign: true
  }

  res.render('auth/sign', config)
})

router.post('/signup', uploadCloud.single('photoURL'), (req, res, next) => {
  User.register(
    { ...req.body, photoURL: req.file.secure_url },
    req.body.password
  )
  .then(user => res.send('Nice!')) //Change!
  .catch(err => res.send(err))
})

router.get('/login', (req, res, next) => {
  const config = {
    title: 'Log in!',
    action: '/login'
  }

  res.render('auth/sign', config)
})

router.post('/login', passport.authenticate('local'), (req,res, next) => {
  res.redirect('/')
})

module.exports = router