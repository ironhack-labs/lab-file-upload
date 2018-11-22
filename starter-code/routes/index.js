const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');

const cloudinary = require("../config/cloudinary")
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});


router.get("/new",(req,res)=>{
  res.render("authentication/new")
})

router.post('/new', uploadCloud.single('photo'), (req, res, next) => {
  const { content, picName } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newPost = new Movie({content, picName, imgPath, imgName})
  newPost.save()
  .then(post => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});

module.exports = router;
