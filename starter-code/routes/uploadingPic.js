const express = require('express');
const router  = express.Router();
const multer = require('multer');
const Picture = require('../models/picture');
const bodyParser = require('body-parser');

const upload = multer ({dest: '../public/uploads/'});

router
.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    path: `/uploads/${req.file.filename}`,
  });

  pic.save((err) => {
      res.redirect('/');
  });
});