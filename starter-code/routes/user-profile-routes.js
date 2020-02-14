const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config');
const Post = require('../models/Post.model');
const User = require('../models/User.model');

//photo upload page
router.get(
  '/profile/photo-upload',
  ensureLoggedIn('login'),
  (req, res, next) => {
    res.render('users/photo-upload-form');
  }
);
//upload photo
router.post(
  '/profile/photo-upload',
  uploadCloud.single('image'),
  (req, res, next) => {
    // console.log({ body: newPic, file: req.file });
    User.findByIdAndUpdate(req.user._id, {
      path: req.file.url,
    })
      .then(() => res.redirect('/profile'))
      .catch(err => next(err));
  }
);

//user details from comments and post details pages
router.get('/profile-details', (req, res, next) => {
  const { user_id } = req.query;
  const userInSession = req.user;
  User.findById(user_id)
    .then(foundOne => {
      if (userInSession && userInSession.email === foundOne.email) {
        res.redirect('/profile');
        return;
      }

      const { username, email, path, imageName } = foundOne;
      res.render('users/user-details', {
        username,
        email,
        path,
        imageName,
      });
    })
    .catch(err =>
      console.log(`Error while looking to get user details from DB`)
    );
});

module.exports = router;
