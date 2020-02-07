const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const user       = require('../models/user')
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res, next) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup',
ensureLoggedOut(),
(req,res)=>{

    const {username, email, password } = req.body
    
    console.log(username, email,password);
    
if(username === ''|| email ===''||password ===''){    
    res.render('authentication/signup')
}
    res.render('authentication/login' )
},
passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
   })


);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', 
 (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
