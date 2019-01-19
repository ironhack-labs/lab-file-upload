const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Photo = require('../models/user.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express - Generated with IronGenerator' });
});

router.post('/signup', uploadCloud.single('photo'), (req, res, next) => { //ajouter req res pour authentification
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newPhoto = new Photo({imgPath, imgName})
  newPhoto.save()
  .then(photo => {
    res.redirect('/');
  })
  .catch(error => {
    console.log(error);
  })
});



module.exports = router;
