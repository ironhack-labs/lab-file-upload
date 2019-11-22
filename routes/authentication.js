const express = require("express");
const passport = require('passport');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const cloudinaryStorage = require("multer-storage-cludinary");
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post('/signup', ensureLoggedOut(),uploadCloud.single('photo'), passport.authenticate('local-signup',
{successRedirect : '/',
failureRedirect : '/login',
failureFlash : true}), (req,res) => {
})

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', ensureLoggedOut(),uploadCloud.single('photo'), passport.authenticate('local-signup'), (req,res) => {
    const { username, password, email } = req.body;
    const photoUrl = req.file.url;
    const photoName = req.file.originalname;
    const newUser = new User({
        username: username, 
        email: email, 
        password: password, 
        "photoName": photoName, 
        "photoUrl": photoUrl
    });
    newUser.save()
    .then(user => {
      res.redirect('/login');
    })
    .catch(error => {
      console.log(error);
    })
})

module.exports = router;


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
