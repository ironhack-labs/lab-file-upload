const express = require('express');
const router  = express.Router();
var multer  = require('multer');
const Picture = require('../models/pictures');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab-express-file-upload');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("HOME")
  Picture.find((err, pictures) => {
    res.render('index', {pictures});
  })
});

// Route to upload from project base path
var upload = multer({ dest: './public/uploads/' });


router
.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});



module.exports = router;
