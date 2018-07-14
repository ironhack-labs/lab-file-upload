const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "uploads/users/" });

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", {
    message: req.flash("error"),
    menuClass: "col-12 col-sm-6 mx-auto"
  });
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
  res.render("authentication/signup", {
    message: req.flash("error"),
    menuClass: "col-12 col-sm-6 mx-auto"
  });
});

router.post(
  "/signup",
  ensureLoggedOut(),
  upload.single("profilePic"),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile");
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
