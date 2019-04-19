const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const Picture = require("../models/picture");
const User = require("../models/user");

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

const upload = multer({ dest: "./public/uploads/" });

router.post(
  "/signup",
  ensureLoggedOut(),
  upload.single("photo"),
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.post("/profile", upload.single("photo"), (req, res) => {
  const pic = new Picture({
    name: req.body.name,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname,
    creatorId: req.user._id
  });
  const patata = req.user.username;
  // console.log(patata)
  User.findOneAndUpdate({ username: patata }, { photo: pic.path }).then(user =>
    console.log(user)
  );
  res.redirect("/profile", { user: req.user });

  // debugger
  // Comento esto para que no se posteen como todas las demas las imagenes de perfil que pongamos a nuestros perfiles
  // pic.save((err) => {
  // });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
