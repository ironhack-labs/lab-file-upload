// const passport = require("passport");
// const mongoose = require('mongoose');
// const User = require("../models/user");


// module.exports.login = (req, res, next) => {
//   res.render('authentication/login', { message: req.flash('error')});
// };
// module.exports.doLogin = passport.authenticate('local-login', {
//   successRedirect : '/',
//   failureRedirect : '/login',
//   failureFlash : true
//   });


// router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
// successRedirect : '/',
// failureRedirect : '/login',
// failureFlash : true
// }));

// router.get('/signup', ensureLoggedOut(), (req, res) => {
//   res.render('authentication/signup', { message: req.flash('error')});
// });

// router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
// successRedirect : '/',
// failureRedirect : '/signup',
// failureFlash : true
// }));

// router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
//   res.render('authentication/profile', {
//       user : req.user
//   });
// });

// router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
//   req.logout();
//   res.redirect('/');
// });