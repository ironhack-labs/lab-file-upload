const express    = require('express');
const User = require('../models/user');
const passport   = require('passport');
const router     = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res,next) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', ensureLoggedOut(),uploadCloud.single('picture'),passport.authenticate('local-signup', {
   // successRedirect : '/profile',
  //  failureRedirect : '/signup',
    failureFlash : true
  }),
async(req,res,next)=>{

const imgPath = req.file.url;
console.log(imgPath)
const { _id } = req.user;
 // const { secure_url: photoURL } = req.file
  const user = await User.findByIdAndUpdate(_id, { picture:imgPath }, { new: true })
  //req.user = user;
  res.redirect('/profile')

}
);
/*
passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  })

  */

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {

    res.render('authentication/profile', req.user)
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
