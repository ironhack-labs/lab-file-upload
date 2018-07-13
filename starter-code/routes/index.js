const express = require('express');
const router  = express.Router();
const multer = require("multer")
const upload = multer({ dest: './uploads/' });
const Post = require('../models/post')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.get('/newPost', (req, res, next) => {
  res.render('newPost');
});

router.post('/newPost', upload.single('post-photo'),(req, res, next) => {
  console.log(req.file) 
  const content= req.body.content;
  const picPath = req.file.filename
  const picName= req.file.originalname;
  new Post({content, picPath,picName})
  .save().then( post => {
    console.log("Post sucessfully created!");
    Post.find().then(posts => {
      res.render('index', { title: 'Express - Generated with IronGenerator' , posts});
    })
  });
  
  
});

module.exports = router;
