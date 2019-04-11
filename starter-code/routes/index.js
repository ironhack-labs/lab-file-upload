const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const upload = require('../helpers/multer.js');
const uploadProfilePicture = upload.uploadProfilePicture;

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then(posts => {
    res.render("index", { posts, user : req.user });
  })
});

router.post('/upload', uploadProfilePicture.single('photo'), (req,res) => {
  const { id } = req.params;
  const image = req.file.url;
  User.findByIdAndUpdate(id, {$set: {image}})
  .then(() => {
    res.redirect('/private')
   });
});



module.exports = router;