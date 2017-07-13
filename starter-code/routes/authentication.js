const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/' });
const User = require('../models/user');
const Post = require('../models/post');

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
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    Post.find({userId: req.user._id}, (err,posts) => {
      if (err) { return err}
      res.render('authentication/profile', {user : req.user, posts: posts});
    })

});

router.get('/create/:id', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/create-post', {
        user : req.user
    });
});

router.post('/create-post', ensureLoggedIn('/login'), upload.single('photo'), (req,res) => {
  console.log(req.user);
  console.log(req.body);
  console.log(req.file);
  const newPost = new Post({
    userId: req.user._id,
    comments: req.body.comments,
    pic_path : req.file.path,
    pic_name: req.file.filename
  });
  newPost.save((err, post) => {
    if (err) {
      return err;
    }
    res.redirect("/profile");
  });
});


router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
