const express = require("express");
const router = express.Router();
const Image = require('../models/Image')
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary')
const Comment = require('../models/Comment')
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

/* GET home page */
router.get("/", isLoggedIn, async(req, res) => {
  const images = await Image.find()
  console.log(images)
  res.render('index', { images }) 
});

router.get('/private', isLoggedIn, async (req, res) => {
  const usuario = await User.findById(req.session.currentUser._id)
    res.render('private', {usuario})
});

router.get('/update', isLoggedIn, async (req, res)=>{
  res.render('update-profile')
})

router.post('/update', isLoggedIn, uploadCloud.single('photo'), async (req, res)=>{
  console.log(req.session.currentUser)
  //const {username}= req.body
  const {url: userImg} = req.file
  await User.findByIdAndUpdate(req.session.currentUser._id, {userImg})
  res.redirect('/private')
})

router.get('/show', async (req, res, next) => {
  const usuario = await User.find()
  console.log(usuario)
  const images = await Image.find()
  res.render('show', { images , usuario})
})

router.get('/create', isLoggedIn, (req, res,)=>{
  res.render('create')
})

router.post('/create', isLoggedIn, uploadCloud.single('photo'), async (req, res, next)=>{
  const {content, picName} = req.body
  const {url: picPath}= req.file
  await Image.create({content, picPath, picName})
  res.redirect('/')
} )


router.get('/comment/:id', isLoggedIn, async (req, res, next)=>{
  res.render('comment', {id:req.params.id})
})

router.post('/comment/:id', isLoggedIn, uploadCloud.single('photo'), async(req, res, next)=>{
  const {content, authorId=req.session.currentUser._id}=req.body
  await Comment.create({content, authorId, imageId: req.params.id})
  //const {url: imagePath}= req.file
  //await Image.create({content, imagePath})
  res.redirect('/')
})
module.exports = router;
