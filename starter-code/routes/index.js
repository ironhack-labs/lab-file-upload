const express = require('express');
const router  = express.Router();
var multer = require('multer');

var pictures = [];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

var upload = multer ({dest: './public/uploads/'});

router.post('/upload',upload.single('photo'),function(req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pictures.push({
    "imgURL": req.file.filename,
    "name": req.body.name
  });
  res.redirect('/');
});

module.exports = router;
