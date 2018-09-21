const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Post = require("../models/post.js")

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().then(e =>{
    res.render('index', {e});
  })

  
});

module.exports = router;
