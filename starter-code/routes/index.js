const express = require('express')
const router = express.Router()

const cloudinaryConfig = require('../config/cloudinary.config')
const multer = require('multer');
const Picture = require('../models/picture.model');
// Route to upload from project base path
// const upload = multer({ dest: './public/uploads/img/' })


const isRegister = req => req.user

// Home

router.get('/', (req, res, next) => {

  Picture.find()
    .then(pictures => {
      res.render('index', { pictures, isRegister: isRegister(req) })
    })
    .catch(err => console.log('Error!:', err))
})



// New 

router.get('/add', (req, res) => res.render('add-post'))

router.post('/add', cloudinaryConfig.single('photo'), (req, res) => {
  const content = req.body.content
  const creatorId = req.user.id
  const imgPath = req.file.url
  const imgName = req.file.originalname
  const pic = new Picture({
    description: content,
    creatorId,
    imgName,
    imgPath
  })

  pic.save()
    .then(x => {
      res.redirect('/')
    })
    .catch(err => {
      console.log('Error!:', err)
      res.redirect('/')
    })


})


// Show 

router.get('/show/:id', (req, res) => {
  Picture.findById(req.params.id)
    .then(picture => res.render('show-post', { picture }))
    .catch(err => {
      console.log('Error!:', err)
      res.redirect('/')
    })

})


// Profile
router.get('/profile', (req, res) => {
  Picture.findById(req.user)
    .then(picture => {
      const user = req.user
      res.render('profile', { user })
    })
    .catch(err => {
      console.log('Error!:', err)
      res.redirect('/')
    })

})


// router.post()



module.exports = router;
