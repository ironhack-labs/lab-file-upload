const express = require('express');
const passport = require('passport');
const router = express.Router();


const uploadCloud = require('../configs/cloudinary.js');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');
const User = require('../models/User.model')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
  res.render('authentication/login', {
    message: req.flash('error')
  });
});

router.post(
@@ -18,7 +28,9 @@ router.post(
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
  res.render('authentication/signup', {
    message: req.flash('error')
  });
});

router.post(
@@ -37,9 +49,71 @@ router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  });
});

// router.post('/photo/add/:id', uploadCloud.single('photo'), (req, res, next) => {
//   //write preparation, extracting the values send via the form
//   const imgPath = req.file.url;
//   const imgName = req.file.originalname;



//   let id = req.params.id
//   let user = { imgPath , imgName}

//   User.findByIdAndUpdate(id, user)

//     .then(updatedUser => {
//       res.render('authentication/profile', {
//         updatedUser
//       });
//     });

// });


router.post('/photo/add/:id', uploadCloud.single('photo'), (req, res, next) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  let id = req.params.id
  let user = {
    imgPath,
    imgName
  }

  User.findByIdAndUpdate(req.user.id, user)
    .then(updatedUser => {
      res.render('authentication/profile', {
        updatedUser
      });
    });


});

// router.post('/photo/add/:id', uploadCloud.single('photo'), (req, res, next) => {

// const imgPath = req.file.url;
// const imgName = req.file.originalname;

// let id = req.params.id
// let user = { imgPath , imgName}

// User.findByIdAndUpdate(req.user.id, user)
//   .then(updatedUser => {
//     res.render('authentication/profile', {
//       updatedUser
//     });
//   });

// });



router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;


module.exports = router; 