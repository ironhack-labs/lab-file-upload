const express = require('express');
const passport = require('passport');
const router  = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './uploads/profile' });
const Profile = require('./../models/profile');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {

    Profile.findOne({'user': req.user.id}, (error, profile) => {
      if (error) { return next(error); }
      //console.log('Photo', profile.pic_path);
      return res.render('authentication/profile', {user : req.user, picture: profile});
    });
});

router.get("/profile/upload", (req, res, next) => {
  res.render('authentication/upload');
});

router.post('/profile/upload', upload.single('photo'), function(req, res){

  const profileImage = new Profile({
    user: req.user.id,
    pic_path: `/uploads/profile/${req.file.filename}`,
    pic_name: req.file.originalname
  });

  profileImage.save((err) => {
      res.redirect('/profile');
  });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
