const express = require('express');
const router = express.Router();
const passport   = require('passport');
var multer  = require('multer');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
var upload = multer({ dest: './public/uploads/' });
const bodyParser         = require('body-parser');


// LOGIN

router.get('/login', ensureLoggedOut(), (req, res, next) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), (req, res, next) => {
  let username = req.body.username;
  console.log("DEBUG: " + username);
  User.findOne({"username": username}, (err, user) => {
    console.log("DEBUUUUUG " + user)
    res.render('authentication/profile', {user})
  });
});

// , passport.authenticate('local-login', {
//   successRedirect : '/',
//   failureRedirect : '/login',
//   failureFlash : true
// })




// SIGN UP
router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

// router.post('/signup', upload.single('photo'), (req, res) => {
//
//   console.log("DEBUUUUUG");
//   console.log(req.body, req.params);
// });

router.post('/signup',
ensureLoggedOut(),
// // passport.authenticate('local-signup', {
// //   successRedirect : '/',
// //   failureRedirect : '/signup',
// //   failureFlash : true
// // }),
upload.single('photo'), (req, res, next) => {

  console.log("DEBUUUUUG");
  console.log("REQ FILEEEEE", req.body, req.params, req.file);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const photo = {
      filePath: `/uploads/${req.file.filename}`,
      originalFileName: req.file.originalname,
    };

  //bcrypt?

console.log(username, email, password, photo);

    const newUser = User({
      username,
      email,
      password,
      photo,
    });

    newUser.save((err) => {
      res.redirect('/profile');
    });
});



router.get('/profile', ensureLoggedIn('/login'), (req, res, next) => {
  // let username = req.body.username;
  // console.log("DEBUG: " + username);
  // User.findOne({"username": username}, "username", (err, user) => {
  //   console.log("DEBUUUUUG " + user)
    res.render('authentication/profile', {user})
  // });
});


router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
