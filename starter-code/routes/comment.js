const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const Picture = require("../models/user")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const mongoose = require('mongoose');
const Post = require("../models/post");
const Comment = require("../models/comment")
const upload = multer({ dest: './public/uploads/' });


router.post('/comment',upload.single('photo'),(req,res,next)=>{
 
  const content = req.body.content
  const authorid = req.user._id
  const imagePath = `/uploads/${req.file.filename}`
  const imageName = req.file.originalname
  const postId = req.body.postId

  const comentary = {
    content: content,
    authorid: authorid,
    imagePath: imagePath,
    imageName: imageName,
    postId: postId
  }


 Comment.create(comentary)
 .then((data)=>{
  Post.findByIdAndUpdate(postId,{$push:{commentaries:data._id}},{new:true})
  .then(()=>{
    
    res.redirect('/')
  })
  
 })


})
module.exports = router;