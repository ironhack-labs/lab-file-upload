const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');
const transporter = require('../mail/transporter');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/profile", (req, res, next) => {
  console.log(req.session.passport.user);
  User.findById({ _id: req.session.passport.user })
    .then(user => {
      console.log(user);
      res.render("auth/profile", { user })
    })
    .catch((err) => console.log(err))
  //res.render("auth/login", { "message": req.flash("error") });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
      token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      username,
      password: hashPass,
      confirmationCode: token,
      email: req.body.email
    });
    newUser.save()
      .then(() => {
        transporter.sendMail({
          from: '"My Awesome Project 👻" <sandraironhack@gmail.com>',
          to: req.body.email,
          subject: 'Awesome Subject',
          text: 'Awesome Message',
          html: `http://localhost:3000/auth/confirm/${token}`
        })
          .then(info => console.log(info))
          .catch(error => console.log(error))
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/confirm/:confirmCode", (req, res) => {
  console.log(req.params.confirmCode);
  User.findOneAndUpdate({ confirmationCode: req.params.confirmCode }, { $set: { status: 'Active' } })
    .then((usr) => {
      res.render("auth/confirmation")
    })
    .catch(err => console.log(err))
});

module.exports = router;
