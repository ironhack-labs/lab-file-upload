const express             = require('express');
//const uploadCloud         = require('../config/cloudinary.js');
const router  = express.Router();
const Post                = require('../models/post');
const User = require("../models/user")

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  //.populate('creatorId', "username")
  .then(posts => {
    console.log(posts)
    res.render('index',  {posts});
  })
  .catch(err=> {console.log("error")});
});

module.exports = router;
