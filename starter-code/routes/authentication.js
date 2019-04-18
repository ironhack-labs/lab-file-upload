const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Picture = require('../models/picture');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');



router.post('/login',  passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/',
  failureFlash : true
}));



router.post('/signup', upload.single('photo'), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));


router.post('/upload', upload.single('photo'), (req, res) => {
  console.log(req.body.name)
  //mongo save action via mongoose
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  //actual db save via mongoose
  pic.save((err) => {
    res.redirect('/');
  });
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
