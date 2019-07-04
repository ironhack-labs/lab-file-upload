const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require('../config/cloudinary.js');
const Post = require("../models/Post");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/userPage",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post("/userPage", uploadCloud.single('photo'), passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}), (req, res) => {

  const { name, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const content = req.body.postText
  const author = req.body.author
  const comments = ""


  const newPost = new Post({
    content,
    author,
    comments,
    picture: { name, description, imgPath, imgName },
  });

  newPost.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/login", { message: "Something went wrong" })
      console.log(err);
    })
});


router.post("/signup", uploadCloud.single('photo'), (req, res, next) => {
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

    const { name, description } = req.body;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    const newUser = new User({
      username,
      password: hashPass,
      picture: { name, description, imgPath, imgName },
    });

    newUser.save()
      .then(() => {
        res.redirect("/auth/login");
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

module.exports = router;
