const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const Picture  = require('../models/picture');
const upload   = multer({ dest: './public/uploads'});

/* GET home page. */
router.get('/', (req, res, next) => {
  Picture.find()
  .then(pictures => {
    res.render('index', { pictures: pictures });
  })
  .catch(err => {
    console.log(err);
    next(err);
  })
});

router.post('/upload', upload.single('photo'), function(req, res){

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
