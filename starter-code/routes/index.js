const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/user');
const upload = multer({ dest: './public/uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', {pictures})
  })
});

router.get('/upload', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('upload')
  })
});

router.post('/upload', upload.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});

module.exports = router;
