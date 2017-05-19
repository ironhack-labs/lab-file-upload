const express  = require('express');
const ensure   = require('connect-ensure-login');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');
const Post     = require('../models/post.js');


router.get('/posts/new',
// We need to be logged in to create posts
  ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    res.render('posts/new-post.ejs');
  }
);

const myUploader = multer({
   dest: path.join(__dirname, '../public/uploads/')
});




module.exports = router;
