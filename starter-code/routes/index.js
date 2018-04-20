const express = require('express');
const multer = require('multer');
const router  = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

// const uploadHandler = multer({ dest: './public/uploads/' });
// router.post('/upload', uploadHandler.single('photo'), (req, res, next) => {
//   console.log("ASDFASD")
//   console.log(req.body);
//   console.log(req.file);
//   res.redirect('/')
// });

module.exports = router;
