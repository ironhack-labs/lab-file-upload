const express = require("express");
const passport = require("passport");
var multer = require("multer");

const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
var upload = multer({ dest: './public/uploads/' });
const Picture = require("../models/Picture");
const Post = require('../models/Post');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('auth', { title: 'Express' });
});


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

router.get("/signup",  upload.single('photo'),ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  Picture.find((err, Picture) => {
    res.render("authentication/profile", {
      user: req.user,
      Picture
    });
  })
});

router.post("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
