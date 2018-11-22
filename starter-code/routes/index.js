const express = require('express');
const router  = express.Router();
const User = require('../models/user.js');
const uploadCloud = require('../config/cloudinary');
const Comment = require('../models/Comment');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.get('/comment/add', (req,res) =>{
  res.render("comment")
})

router.post('/comment/add', uploadCloud.single('imgPath'), (req,res) =>{
  const {content} = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newComment = new Comment({
    content,
    imgPath,
    imgName,
  });

  newComment.save((err) => {
      if (err){ next(null, false, { message: newComment.errors }) }
  }).then(data=>{
    res.render("index" , {data});
  })
})
module.exports = router;
