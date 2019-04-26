const express = require('express');
const passport = require('passport');
const multer = require('multer');

const { isLogged } = require('../config/middlewares');
const User = require('../models/User');

const router = express.Router();
const upload = multer({ dest: 'public/avatars/' });

router.get('/signup', (req, res, next) => {
  res.render('auth/form', {
    newAccount: true,
    form: {
      title: 'Welcome!',
      action: '/signup'
    },
    button: {
      title: 'Create a new account'
    }
  });
});
router.post('/signup', upload.single('photo'), (req, res, next) => {
  const {
    body: { username, password },
    file: { filename }
  } = req;

  const user = {
    username,
    photoURL: `/avatars/${filename}`
  };

  User.register(user, password)
    .then(user => {
      res.redirect('/login'); // TODO: We have to auth the user
    })
    .catch(err => next(err));
});

router.get('/login', (req, res, next) => {
  res.render('auth/form', {
    form: {
      title: 'Hi there!',
      action: '/login'
    },
    button: {
      title: 'Login'
    }
  });
});
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })
);

router.get('/profile', isLogged, (req, res, next) => {
  const { user } = req;
  res.render('auth/profile', user);
});

module.exports = router;
