const express = require('express');
const router  = express.Router();
const multer  = require('multer');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Tumblr' });
});


const upload = multer({ dest: './public/uploads/' });

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
