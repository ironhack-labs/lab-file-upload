const express = require('express');
const router  = express.Router();
var multer = require('multer');

/* GET home page. */

var pictures = [];


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

// router.post('/upload',upload.single('photo'),function(req, res, next) {
//   console.log(req.body);
//   console.log(req.file);
//   pictures.push({
//     "imgURL": req.file.filename,
//     "name": req.body.name
//   });
//   res.redirect('/');
// });



module.exports = router;
