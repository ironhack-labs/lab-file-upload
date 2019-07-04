const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Post = require("../models/post");
const uploadCloud = require('../config/cloudinary.js');



/* GET home page */
router.get('/', (req, res, next) => {
  
Post
.find()
.then((allPosts)=>{

  res.render("index", {allPosts})
}).catch((err)=> console.log(err))
});

module.exports = router;
