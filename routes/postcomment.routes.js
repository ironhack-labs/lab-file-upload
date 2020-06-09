const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');

const mongoose = require('mongoose');

var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

const routeGuard = require('../configs/route-guard.config');


router.post('/comment',upload.single("picture"),(req, res) => {
  const postId = req.query.post_id;
  const authorId = req.session.currentUser._id;
  const contentComment = req.body.content;
  let imageName = "";
  let imagePath = "";
  if (req.file){
    imageName = req.file.filename;
    imagePath = req.file.path;
  } 
  Post.update({_id: postId},{ $push: {comments: {authorId, contentComment, imagePath, imageName}}})

  .then(postFromDb => {
    res.redirect(`/postdetails?id=${postId}`);
  })
  .catch((err) => {
    console.log("Err",err);
  })
});



router.get('/create-post', (req, res) => res.render('post/post-form'));

module.exports = router;
