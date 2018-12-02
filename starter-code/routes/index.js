const express = require('express');
const router  = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const uploadMethods = require('../config/cloudinary.js');
const uploadProfilePicture = uploadMethods.uploadProfilePicture;

/* GET home page. */
router.get('/', (req, res, next) => {

  Post.find()
  .then(posts => {
    res.render("index", { posts, user : req.user });
  })
  
});

router.post('/upload', uploadProfilePicture.single('photo'), (req,res) => {
  const id = req.user._id;
  const imgPath = req.file.url;
  User.findByIdAndUpdate(id,{imgPath})
  .then(()=> res.redirect('/profile'))
})

module.exports = router;
