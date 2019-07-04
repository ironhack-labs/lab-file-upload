const express = require("express");
const passport = require('passport');
const uploadCloud = require('../config/cloudinary.js');
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/post");




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
  res.render("auth/profile", {user: req.user});
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup",uploadCloud.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const imgName = req.file.url;
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

    const newUser = new User({
      username,
      password: hashPass,
      imgName,
      
    });

    newUser.save()
    .then(() => {
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
router.post("/post",uploadCloud.single('photo'), (req, res, next) => {
  Post 
    
    .create({ content: req.body.content, author: req.body.author , photo :req.file.url})

    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render(err);
    })
    
});

module.exports = router;
