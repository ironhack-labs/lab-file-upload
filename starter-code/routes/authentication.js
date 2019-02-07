const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const cloudinary = require("../options/cloudinary");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post("/signup", cloudinary.single("photo"), (req, res, next) => {
  console.log(req.file);
  const myUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    photoPath: req.file.url
  });
  myUser
    .save()
    .then(payload => {
      console.log("User was saved successfully ", payload);
      res.redirect("/");
    })
    .catch(err => console.log("An error ocurred saving an user in db: ", err));
});

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
