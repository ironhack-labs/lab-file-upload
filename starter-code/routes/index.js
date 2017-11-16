const express = require('express');
const multer = require('multer');
const router  = express.Router();
const Picture = require('../models/pictures');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

/* upload picture*/

router.get('/upload', (req, res, next) => {
  res.render('uploadpicture');
});


var upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('photo'), function(req, res){

  const pic = new Picture({
    name: req.body.name,
    pic_path: `/uploads/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/profile');
  });
});



module.exports = router;
