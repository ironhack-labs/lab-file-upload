const express = require('express');
const router  = express.Router();
const multer = require('multer');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

const uploadHandler = multer({ dest: './public/uploads/' });
router.post('/upload', uploadHandler.single('photo'), (req, res, next) => {
  
  res.redirect('/')
});


module.exports = router;
