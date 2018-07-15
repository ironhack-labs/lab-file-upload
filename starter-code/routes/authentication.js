const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({dest: './public/uploads'});
const Posts = require('../models/post');

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

router.post('/signup', ensureLoggedOut(), upload.single('photo'), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}))


router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    Posts.find({creatorId: req.user._id})
    .populate('creatorId', 'username')
//    .populate('comments.authorId', 'username')
    .sort({updated_at: -1})
    .then( (posts) => {
      res.render('authentication/profile', {
        posts: posts,
        user : req.user
    });
    })
    .catch( (err) => {
      console.log(err);
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
