const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const Post = require('../models/post');
const multer = require('multer');
var upload = multer({ dest: './public/uploads/' });

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

router.post('/signup', upload.single('photo'), ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/upload', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/upload', {
        user : req.user
    });
});

router.post('/upload', ensureLoggedIn('/login'),
    upload.single('file'),
    function(req, res, next) {
      let content= req.body.content;
      let userId = req.user.id;
      let picName= req.file.filename;
      const newPost = new Post({
        content: content,
        userId: userId,
        picName: picName
      });
      newPost.save((err) => {
      res.redirect('/profile');
  });
    });

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
