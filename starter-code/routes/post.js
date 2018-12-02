const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");
const uploadMethods = require('../config/cloudinary.js');
const uploadPostPicture = uploadMethods.uploadPostPicture;

/* GET home page. */
router.get('/new',(req,res)=>{
  res.render('post/new');
})

router.post('/uploadPost', uploadPostPicture.single('postPic'), (req,res) => {
  const picPath= req.file.url
  const content = req.body.content;
  const creatorId = req.user;
  const picName = req.file.originalname;
  
  Post.create({picPath,content,creatorId,picName}).
  then(post => {
    console.log(`Se ha publicado el post`);
    res.redirect('/');
  });
  
})

module.exports = router;
