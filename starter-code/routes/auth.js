const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
/**********************************************/
/************* UPLOADING CONFIG ***************/
/**********************************************/
const uploadCloud = require('../config/cloudinary')

router.get('/signup', (req, res) => {
  res.render('sign-up')
})

router.post('/signup', uploadCloud.single('profilePicture'), (req, res) => {
  let { username, password } = req.body
  /**********************************************/
  /************* CLOUDINARY CONFIG ***************/
  /**********************************************/
  const profilePictureName = req.file.originalname
  const profilePicturePath = req.file.url

  if (!password) return res.render('sign-up', { err: 'Empty password' })
  if (!username) return res.render('sign-up', { err: 'Empty username' })
  const salt = 10
  const bsalt = bcrypt.genSaltSync(salt)
  password = bcrypt.hashSync(password, bsalt)
  console.log(password)
  // Creating a new doc in the DB
  User.create({ username, password, profilePictureName, profilePicturePath })
    .then(() => {
      res.redirect('/auth/login')
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  let { username, password } = req.body
  User.findOne({ username }).then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user
      res.redirect('/')
    } else {
      res.render('login', {
        errorMessage: 'Incorrect password'
      })
    }
  })
})

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/auth/login')
  })
})

module.exports = router
