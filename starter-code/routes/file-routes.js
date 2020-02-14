const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config');
const Picture = require('../models/Picture.model');
const User = require('../models/User.model');

router.get(
  '/profile/photo-upload',
  ensureLoggedIn('login'),
  (req, res, next) => {
    res.render('photo/photo-upload-form');
  }
);

router.post(
  '/profile/photo-upload',
  uploadCloud.single('image'),
  (req, res, next) => {
    // console.log({ body: newPic, file: req.file });
    User.findByIdAndUpdate(req.user._id, {
      path: req.file.secure_url,
    })
      .then(() => res.redirect('/profile'))
      .catch(err => next(err));
  }
);

module.exports = router;
