const express = require('express');
 const passport = require('passport');
 const router = express.Router();
 const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
 const multer = require('multer');
 const upload = multer({ dest: './public/uploads/' });
 const Post = require('../models/post');

 router.get('/login', ensureLoggedOut(), (req, res) => {
     res.render('authentication/login', { message: req.flash('error')});
 });

 router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
   successRedirect : '/profile',
   failureRedirect : '/login',
   failureFlash : true,
   passReqToCallback: true
 }));

 router.get('/signup', ensureLoggedOut(), (req, res) => {
     res.render('authentication/signup', { message: req.flash('error')});
 });


 router.post('/signup', [ensureLoggedOut(), upload.single('photo')], passport.authenticate('local-signup', {
   successRedirect : '/profile',
   failureRedirect : '/signup',
   failureFlash : true,
   passReqToCallback: true
 }));

 router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    
     Post.find({creatorId: req.user._id})
     .then(posts => res.render('authentication/profile', {user : req.user, posts}))
     .catch(e => console.log(e));
 });

 router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
     req.logout();
     res.redirect('/');
 });
 
 module.exports = router;