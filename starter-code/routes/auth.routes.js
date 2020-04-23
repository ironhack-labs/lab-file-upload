const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/User.model')
const Post = require('../models/Post.model')

const uploadLocal = multer({ dest: './public/uploads/' })


router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', {
    message: req.flash('error')
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login',
  {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup',
    { message: req.flash('error')
  });
});

router.post('/signup', ensureLoggedOut(), uploadLocal.single('profileImage'), passport.authenticate('local-signup',
  {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })
 );

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/post', (req, res) => res.render('authentication/post'))

router.post('/post', uploadLocal.single('picName'), (req, res, next) => {
  const { content } = req.body
  Post.create({
    content,
    creatorId: req.user.id,
    picName: `/uploads/${req.file.filename}`
  })
    .then(() => res.redirect('/'))
    .catch(err => next(new Error(err)))
})


module.exports = router;