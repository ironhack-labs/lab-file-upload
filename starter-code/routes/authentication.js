const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");

router.get("/login", ensureLoggedOut(), (req, res) => {
  console.log('LOGIIIN')
  res.render("authentication/login", { message: req.flash("error") });
});

router.post("/login", ensureLoggedOut(), passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post(
  "/signup",
  ensureLoggedOut(),
  passport.authenticate("local-signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.get("/editPic", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/editPic", {
    user: req.user
  });
});

router.post("/editPic", ensureLoggedIn("/login"), uploadCloud.single("photo"), (req, res) => {
    const { url } = req.file;
    const { id } = req.user
    User.findByIdAndUpdate(id, { imgPath: url }, { new: true })
      .then(() => res.redirect("/profile"))
      .catch(err => console.log(err))
   }
)

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;