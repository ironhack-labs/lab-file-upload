const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
//multer config
const multer = require("multer");
const upload = multer({ dest: "./public/assets" });

function isAuthenticated(req, res, next) {
 if (req.isAuthenticated()) {
   console.log(req.user);
   return next();
 } else {
   res.redirect("/login");
 }
}

function isLoggedIn(req, res, next) {
 if (req.isAuthenticated()) {
   res.redirect("/private");
 } else {
   next();
 }
}

router.get("/logout", (req, res, next) => {
 req.logout();
 res.send("cerrado ??? ");
});

router.get("/login", isLoggedIn, (req, res) => {
 res.render("auth/login");
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
 req.app.locals.user = req.user;
 res.redirect("/private");
});

router.get("/private", isAuthenticated, (req, res) => {
 res.render("privado");
});

router.get("/signup", (req, res) => {
 res.render("auth/signup");
});

router.post("/signup", upload.single("photo"), (req, res, next) => {
 req.body.photoURL = "/assets/" + req.file.filename;
 User.register(req.body, req.body.password)
   .then(user => {
     res.redirect("/login");
   })
   .catch(e => next(e));
});

module.exports = router;

