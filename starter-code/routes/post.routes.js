const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const uploadCloud = require('../configs/cloudinary')

const { 
  ensureLoggedIn,
  ensureLoggedOut,
} = require('connect-ensure-login');

const {
  newPost,
  newPostProcess,
  postsView,
  newCommentProcess,
} = require("../controllers/post.controllers")





router.get('/posts', postsView)

router.get('/newPost', newPost)
router.post('/newPost', uploadCloud.single('photo'), newPostProcess)

router.post('/newComment', uploadCloud.single('photo'), newCommentProcess)


module.exports = router;