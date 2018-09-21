const express = require('express');
const router  = express.Router();
const User = require("../models/user");
const ImagePost = require("../models/imagePost")
const multer = require('multer');

/* GET home page. */
router.get('/', (req, res, next) => { 

  ImagePost.find()
  .then(posts => {
    res.render('index', {posts, user: req.user})
  })
});

module.exports = router;
