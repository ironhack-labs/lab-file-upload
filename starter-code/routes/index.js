const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/Post');
const Comment = require('../models/Comment')

/* GET home page */
router.get('/', (req, res, next) => {

  Post
    .find()
    // .populate("author")
    .then(post => {
      res.render("index", { post })
    }).catch((err) => {
      console.log(err)
    })
});


module.exports = router;
