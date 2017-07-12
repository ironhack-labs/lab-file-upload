const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const User = require('./models/user');
const upload = multer({dest: './public/uploads/'});


router.get('/posts/new',(req, res, next) => {
    res.render('posts/new-post.ejs');
  }
);

module.exports = router;
