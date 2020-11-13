const { Router } = require('express');
const router = new Router();

const Post = require('../models/Post.model');
const User =require('../models/User.model')
const mongoose = require('mongoose');

const fileUploader=require('../configs/cloudinary.config')

router.get('/post/:userid', async (req, res) => {
  const userId= req.params.userid
  console.log(userId)
  res.render('post', {userId});
})
router.post('/post/create/:userid', fileUploader.single('image'), (req, res, next) =>{
  const { picName, content, picPath} = req.body;
  const id=req.params

    if (!picName || !content) {
     res.render('post', { errorMessage: 'You need to add something to your post' });
      return;
    }

  Post.create({
    picName,
    content,
    picPath:req.file.path,
    creatorId:id
  })
  .then(x=>{
    console.log(x)
    res.redirect('users/user-profile')
  })
  .catch(err=>{
    console.log(picPath)
    console.log(err)})
    next()
});

module.exports=router

