const express = require("express");
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require("../models/Post");


router.get('/post/add', (req, res, next) => {
  res.render('post-add');
});

router.post('/post/add', uploadCloud.single('photo'), (req, res, next) => {
  const { content, creatorId } = req.body;
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const newPost = new Post({content, creatorId, picPath, picName, comments})
  newPost.save()
  .then(post => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;