const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/private',
  failureRedirect : '/login',
  failureFlash : true
}),(req,res)=>{
  if(req.session.returnTo){
      return res.redirect(req.session.returnTo)
  }
  res.redirect('/private');
});

router.get('/signup', (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/private',
  failureRedirect : '/signup',
  failureFlash : true
}));


router.get('/private', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/private', {
      user : req.user
  });
  });

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;