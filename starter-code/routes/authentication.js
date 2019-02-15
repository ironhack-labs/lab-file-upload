const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User = require('../models/user')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
let multer = require('multer')
let upload = multer({dest: './public/uploads'})
//cloudinary
let uploadCloud = require('../helpers/cloudinary')

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error') });
});


router.post('/signup', ensureLoggedOut(), uploadCloud.single('photoURL'), passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
   }), (req, res) => {
      req.body.photoURL = req.files.photoURL[0].url
          User.findByIdAndUpdate(req.user._id, req.body)
              .then(() => res.redirect('/'))
              .catch(e=>next(e))
   });


router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
