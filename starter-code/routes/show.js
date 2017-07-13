const express = require('express');
const passport = require('passport');
const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });
const User = require('../models/posts');
const router = express.Router();
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

router.get('/posts', ensureLoggedIn('/login'), (req, res) => {
  res.render('posts/post', {
    user: req.user
  });
});
