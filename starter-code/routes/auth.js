const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
  console.log("entrando login ");
    res.render('auth/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', { message: req.flash('error')});
});

router.post('/signup',upload.single('photo'), ensureLoggedOut(), passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('auth/profile', {
        user : req.user
    });
});

router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
