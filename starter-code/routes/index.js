const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const Picture = require('../models/picture');
const User               = require('../models/user');
const Coment               = require('../models/coment');


/* GET home page. */

router.get('/', function(req, res, next) {
  Picture.find((err, pictures) => {
    res.render('index', {pictures, user: req.user})
  })
});

const upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('photo'), (req, res) => {

  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    creatorId: req.user._id
  });
  console.log(pic)

  pic.save((err) => {
      res.redirect('/');
  });
});

router.post('/coment', upload.single('photo'), (req, res) => {
  

  const pic = new Coment({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    creatorId: req.user._id
  });
  console.log(req.body.id)

  Picture.findByIdAndUpdate(req.body.id, {$push:{comments:"hola"}})
  // let comments;
  // Picture.findById(req.body.id).then(picture=> comments = picture.coments);
  // Picture.findByIdAndUpdate({_id: req.body.id}, {photo: [pic]})

  // res.render('index')
  pic.save((err) => {

      res.redirect('/');
  });
});



module.exports = router;
