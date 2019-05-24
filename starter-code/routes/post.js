const express = require('express');
const router  = express.Router();
const uploadCloudinary = require("../config/cloudinary")
const Post = require('../models/post')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.post('/add',[ensureLoggedIn(), uploadCloudinary.single("photo")], (req, res) => {
  
  //console.log(req.body)
  console.log(req)
  const content = req.body.content
  const creatorId = req.user.id
  const picUrl = req.file.url
  const picName = req.file.originalname

  const newPost = new Post({ content, creatorId, picUrl, picName })
  console.log("este es el session id ===>" + req.session.passport.user)
  console.log("este es el user id ===>" + req.user.id)
  newPost.save()
      .then((x) => {
        res.redirect('/')
      })
      .catch(err => console.log('Error!:', err))
})

module.exports = router

