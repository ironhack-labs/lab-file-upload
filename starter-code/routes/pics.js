const express    = require('express');
const router     = express.Router();
const multer  = require('multer');
const Picture = require('../models/pictures');

const upload = multer({ dest: './public/uploads/' });

router
.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});

module.exports = router;
