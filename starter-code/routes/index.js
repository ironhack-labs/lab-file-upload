const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary')
const User = require('../models/user')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.post('/signup', uploadCloud.single('photo'), async (req,res)=>{
  const{username, email, password } = req.body
  const{url: profileImgPath, originalname: profileImg }=req.file
  await User.create({
      username,
      email,
      password,
      profileImg,
      profileImgPath
  })
  res.redirect('/profile')
})

router.get('/profile', (req, res, next) =>{
  res.render('profile')
})

router.get('/create', (req, res, next) =>{
  res.render('create')
})

module.exports = router;
