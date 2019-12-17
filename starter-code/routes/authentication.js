const express    = require('express');
const passport   = require('passport');
const router     = express.Router();

router.get('/login', (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/profile', (req, res) => {
    if (!req.user) {
        res.redirect('/login');
        return;
    }

    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
