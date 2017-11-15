const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' })
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const bcryptSalt = 10;

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

router.post('/signup', ensureLoggedOut(), upload.single('photo'), (req, res) => {
  const { username, email, password } = req.body;

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      message: "Indicate a username and a password to sign up"
    });
    return;
  }

  User.findOne({ "username": username },
    "username",
    (err, user) => {
      if (user !== null) {
        res.render("authentication/signup", {
          message: "The username already exists"
        });
        return;
      }

      var salt = bcrypt.genSaltSync(bcryptSalt);
      var hashPass = bcrypt.hashSync(password, salt);

      var newUser = new User({
        username,
        email,
        password: hashPass,
        photo: {
          pic_path: `/uploads/${req.file.filename}`,
          pic_name: req.file.originalname
        }
      });

      newUser.save((err) => {
        res.redirect("/login");
      });
    });
});

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
