const express = require('express')
const passport = require('passport')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

const multer = require('multer')
const mime = require('mime')

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + mime.getExtension(file.mimetype))
  },
})

const upload = multer({ storage })

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
  upload.single('avatar'),
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

module.exports = router
