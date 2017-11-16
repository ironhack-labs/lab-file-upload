const express = require('express');
const passport = require('passport');
const router = express.Router();
const Picture = require('../models/Photos');
const multer = require('multer');
let upload = multer({dest: '../public/uploads/'});
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

//Con este get me encargo de cargar desde un principio la imagen, y si no hay, desde el ejs muestro o no en función de si 'picture' es undefined o no
router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
  Picture.find((err, picture) => {
    console.log(picture);
    if (picture){
      res.render('authentication/profile', {
        picture:picture,user : req.user})
    } else {
      res.render('authentication/profile', {
        picture:undefined,user : req.user})

    }
  })
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile/edit', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/edit');
});

router.post('/profile/edit',
  upload.single('photo'),
  function(req, res){
  const pic = new Picture({
    name: req.body.name,
    pic_path: `${req.file.filename}`,
    pic_name: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/profile');
  });
});

module.exports = router;
