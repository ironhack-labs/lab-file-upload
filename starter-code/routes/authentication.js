const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const bcrypt = require("bcrypt");
const bcryptSalt = 8;


router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect: './post',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
});

router.post('/signup', ensureLoggedOut(), upload.single('photo'), (req, res, next) => {

  const salt = bcrypt.genSaltSync(bcryptSalt);

  const newUser = new User({
    photo: {
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
    },
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  })

  newUser.save()
    .then(answer => res.redirect('/'))
    .catch(err => console.log(err))

});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
