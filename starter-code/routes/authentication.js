const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User       = require('../models/user');
const upload     = require('../helpers/multer');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  };

router.get('/login', (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/private',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', upload.single('image'),passport.authenticate('local-signup', {
  successRedirect : '/private',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/private', isAuth, (req, res) => {
    let { user } = req;
    res.render('private', { user })
  });

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
