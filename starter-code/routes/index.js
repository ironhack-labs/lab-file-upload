const express = require('express');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require("multer")
const upload = multer ({dest:"./public/uploads/"})
const Post = require("../models/Post")

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({})
  .then(posts=>{
    res.render('index',{posts});

  })
  .catch(err=>{
    console.log(err)
  })
});


module.exports = router;
