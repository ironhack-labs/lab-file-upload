const express = require('express');
const router  = express.Router();
const multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

const Picture = require('../models/picture');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

// Route to upload from project base path

router.post('/upload', upload.single('photo'), function(req, res){

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
