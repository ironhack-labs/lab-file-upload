
require("dotenv").config();

const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');

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

router.post('/signup', ensureLoggedOut(),uploadCloud.single('photo'), passport.authenticate('local-signup',
{successRedirect : '/',
failureRedirect : '/login',
failureFlash : true}), (req,res) => {
})


// router.post('/signup', ensureLoggedOut(),uploadCloud.single('photo'), passport.authenticate('local-signup', {
//   successRedirect : '/',
//   failureRedirect : '/signup',
//   failureFlash : true
// }), (req, res) => {
//   //write preparation, extracting the values send via the form
//   const {username, password, email } = req.body;
//   const {url, imgName} = req.file
// //   const imgPath = req.file.url;
// //   const imgName = req.file.originalname;
//   const newUser = new User({username, password, email, photo:{imgPath, imgName}})
//   //actual write in mongo using mongoose
//   newUser.save()
//   .then(user => {
//     res.redirect('/login');
//   })
//   .catch(error => {
//     console.log(error);
//   })
// }),




router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
