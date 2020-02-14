const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config');
const Post = require('../models/Post.model');
const User = require('../models/User.model');

//Get photo upload form
router.get('/profile/photo-upload', ensureLoggedIn('login'), (req, res, next) =>
  res.render('users/photo-upload-form')
);

//POST uploaded photo
router.post(
  '/profile/photo-upload',
  uploadCloud.single('image'),
  (req, res, next) => {
    // console.log('req.url: ', req.file.url);
    User.findByIdAndUpdate(req.user._id, {
      path: req.file.url,
    })
      .then(() => {
        res.redirect('/profile');
      })
      .catch(err => next(err));
  }
);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
//Get user profile update form
router.get('/profile/update', ensureLoggedIn('login'), (req, res, next) => {
  User.findById(req.user._id)
    .then(foundOne => {
      const { firstName, lastName, username, email, _id } = foundOne;
      res.render('users/user-profile-update', {
        firstName,
        lastName,
        username,
        email,
        _id,
      });
    })
    .catch(err => console.log(err));
});
//POST update user profile
router.post('/profile/update', (req, res, next) => {
  // console.log('req.url: ', req.file.url);
  const { user_id } = req.query;
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    password1,
    password2,
  } = req.body;

  if (password === '' || password1 === '' || password2 === '') {
    res.render('users/photo-upload-form', {
      message: 'All inputs are required!',
    });
    return;
  }

  User.findById(user_id)
    .then(foundOne => {
      // console.log({ body: newPic, file: req.file });
      bcrypt
        .compare(password, foundOne.password)
        .then(isMatch => {
          if (!isMatch) {
            res.render('users/photo-upload-form', {
              message: 'Incorrect password!',
            });
            return;
          }
          if (password1 !== password2) {
            res.render('users/photo-upload-form', {
              message: 'Passwords not match!',
            });
            return;
          }

          bcrypt.hash(password1, 10).then(hashPassword => {
            User.findByIdAndUpdate(user._id, {
              username: username !== '' ? username : user.username,
              firstName: firstName !== '' ? firstName : user.firstName,
              lastName: lastName !== '' ? lastName : user.lastName,
              email: email !== '' ? email : user.email,
              password: hashPassword,
              path: user.path,
            })
              .then(() => {
                // res.redirect('back');
                res.render('users/user-profile-update', {
                  success: 'Thanks!Successfully updated!',
                });
              })
              .catch(err => next(err));
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=--=-=
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

      const {
        firstName,
        lastName,
        username,
        email,
        path,
        imageName,
      } = foundOne;

      res.render('users/user-details', {
        firstName,
        lastName,
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
