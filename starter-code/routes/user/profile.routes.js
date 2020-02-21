const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../configs/cloudinary.config');
const User = require('../../models/User.model');

//Get photo upload form
router.get('/profile/photo-upload', ensureLoggedIn('login'), (req, res, next) =>
  res.render('user/photo-upload')
);

//POST uploaded photo
router.post(
  '/profile/photo-upload',
  uploadCloud.single('image'),
  (req, res, next) => {
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
  const { firstName, lastName, username, email, _id } = req.user;
  res.render('user/user-profile-update', {
    firstName,
    lastName,
    username,
    email,
  });
});
//POST update user profile
router.post('/profile/update', (req, res, next) => {
  const { user } = req;

  const {
    username,
    firstName,
    lastName,
    email,
    password,
    password1,
    password2,
  } = req.body;

  if (!password) {
    res.render('user/user-profile-update', {
      message: 'Please enter your password!',
    });
    return;
  }

  bcrypt
    .compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) {
        res.render('user/user-profile-update', {
          message: 'Incorrect password!',
        });
        return;
      }
      if (password1 !== password2) {
        res.render('user/user-profile-update', {
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
            res.render('user/user-profile-update', {
              success: 'Thanks!Successfully updated!',
            });
          })
          .catch(err => next(err));
      });
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

      res.render('user/user-details', {
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