const express = require('express');
const router  = express.Router();
const Post = require("../models/Post")
const uploadCloud = require('../config/cloudinary.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
      .then((posts) => {
        res.render("index", {posts})
      })
      .catch((error) => {
        console.log(error)
      })
});


module.exports = router;
