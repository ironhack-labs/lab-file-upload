const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer  = require('multer');
const upload = multer({ dest: '../public/uploads/' });
const uploadCloudinary = require("../config/cloudinary");
const Post = require('../models/post');
const Comment = require('../models/comment');

// router.post('/', , passport.authenticate('new-post', {
//   successRedirect : '/',
//   failureRedirect : '/',
//   failureFlash : true
// }));

router.post('/add', [ensureLoggedIn(), uploadCloudinary.single("photo")], (req, res) => {
  const content = req.body.post
  const picPath = req.file.url
  const picName = req.file.originalname
  const creatorId = "ro23rij2oij2o"

  const newPost = new Post({ content, creatorId, picPath, picName })

  newPost.save()
       .then(x => res.redirect('/'))
       .catch(err => console.log('Error!:', err))
})

router.post('/new-comment', [ensureLoggedIn(), uploadCloudinary.single("photo")], (req, res) => {
  const content = req.body.post
  // const picPath = () => req.file == undefined ? undefined : req.file.url
  // const picName = () => req.file == undefined ? undefined : req.file.originalname
  let picPath, picName
  if (req.file == undefined) { 
    picPath = "undefined"
    picName = "undefined"
  } else { 
    picPath = req.file.url
    picName = req.file.originalname
  } 
  const authorId = "ro23rij2oij2o"

  const newComment = new Comment({ content, authorId, picPath, picName })

  newComment.save()
       .then(x => res.redirect('/'))
       .catch(err => console.log('Error!:', err))
})

module.exports = router