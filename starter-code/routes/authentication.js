const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const User       = require('../models/User');
const Picture    = require('../models/Picture');
const multer     = require('multer');
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
  successRedirect : '/login',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/', function(req, res, next) {
    res.render('/index');
  });

  const upload = multer({ dest: './public/images'});

  router.post('/profile', upload.single('photo'), function(req, res){
  
    console.log(req.file);
    const pic = new Picture({
      path: `/images/${req.file.filename}`,
    });
  
    pic.save((err) => {
      if(err) console.log(err);
        res.redirect('/profile');
    });
  });
  router.get('/profile', (req, res) =>{
    Picture.find({})
    .then(response =>{
      res.render("profile", {picture: response});
    })
    .catch(err =>{
      res.send(err);
    });
  });
  
module.exports = router;
