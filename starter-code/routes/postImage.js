const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const ImagePost = require('../models/imagePost.js');


router.get('/postImage', ensureLoggedIn('/login'), (req, res) => {
  res.render('postImage');
});

router.post('/postImage', uploadCloud.single('photo'), (req, res, next) => {
  const content = req.body.imgtext;
  const creatorID = req.user._id;
  console.log(req.user._id)
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const newPost = new ImagePost({content, creatorID, picPath, picName})
  newPost.save()
  .then(movie => {
    res.redirect('/')
  })
  .catch(error => {
    console.log(error)
  })
});


module.exports = router;