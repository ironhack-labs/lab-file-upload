const express = require("express");
const passport = require("passport");
const uploadCloud = require("../config/cloudinary");
const multer = require("multer");
const picture = require("../models/pictures");
const User = require("../models/user");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login");
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
  const userId = req.session.passport.user;
  const imgPath = "";
  if (userId) {
    if (userId.profileImg) {
      imgPath = userId.profileImg.path;
    }
  }
  let userData = {
    userId,
    imgPath
  };
  res.render("authentication/profile", { userData });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

const upload = multer({ dest: process.env.CLOUDINARY_URL  });

router.post("/upload", uploadCloud.single("photo"), function(req, res) {
  let date = new Date();

  userId = req.session.passport.user;

  const pic = new picture({
    name: date,
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic
    .save()
    .then(() => {
      let query = { _id: `${userId}` };
      let profileImg = pic;

      User.findOneAndUpdate(query, { profileImg })
        .then()
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect("/profile");
});

module.exports = router;
