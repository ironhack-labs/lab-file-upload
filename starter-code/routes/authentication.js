const express = require("express");
const passport = require("passport"); //no lo podemos quitar porque lo usamos para el login.
const router = express.Router();
// const multer = require("multer"); lo podemos quitar de aquí porque el cloudinary ya nos lo da.
const User = require("../models/user");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const cloudinary = require("../options/cloudinary")

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

//cloudinary.single("photo") es un middleware.

router.post("/signup", cloudinary.single('photo'), (req, res, next) => {

    const myUser = new User({
            username: req.body.username,
            email:    req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            photoPath: req.file.secure_url
    });
    myUser.save() //Si es una promesa tiene que llevar then para que se ejecute.
    .then(payload => {
        console.log("User was save successfully", payload)
        res.redirect("/")
    })
    .catch(err => {
        console.log("An error ocurred saving a user in db: ", err)
    })
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
