const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const User = require('../models/user');
const upload = multer({ dest: './publi/uploads/' });

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

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

router.post('/upload',upload.single('photo'), function(req, res){

  user = new User({
    name: req.body.name,
    email: req.body.email,
    passwrod: req.body.passwrod,
    pic_path: `/uploads/${req.file.photo}`,
    pic_name: req.file.photo
  });

  user.save()
    .then(user => res.redirect('/'))
    .catch(e => res.render("/", { message: "Something went wrong" }))
});
// router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
//   successRedirect : '/',
//   failureRedirect : '/signup',
//   failureFlash : true
// }));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
