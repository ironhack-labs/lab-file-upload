const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const cloudinaryConfig = require('../config/cloudinary.config')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/", (req, res, next) => {
  res.render('post/create')
})


/* POST new post. */
router.post('/', cloudinaryConfig.single('photo'), ensureLoggedIn('/login'), (req, res, next) => {
  console.log(req.body)
  const { content, contentText, creatorId, picName } = req.body
  const picPath = req.file.url;
  const newPost = new Post({ content, contentText, creatorId, picName, picPath, })
  newPost.save()
    .then(post => {
      console.log(post)
      res.redirect('/');
    })
    .catch(error => { console.log("There was an error creating a new post!", error) })
});





module.exports = router;
