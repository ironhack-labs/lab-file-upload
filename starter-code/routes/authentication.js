const express = require("express");
const passport = require("passport");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Post = require("../models/post");

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

router.post(
  "/signup",
  ensureLoggedOut(),
  upload.single("photo"),
  passport.authenticate("local-signup", {
    successRedirect: "/show",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});

router.post(
  "/show",
  ensureLoggedIn("/login"),
  upload.single("picture"),
  (req, res) => {
    const newPost = new Post({
      content: req.body.content,
      // creatorId: req.user.id,
      picName: req.body.tag,
      pic_path: `/uploads/${req.file.filename}`
    });
    console.log(newPost);
    newPost.save(err => {
      if (err) {
        next(null, false, { message: newPost.errors });
      }
    });
    res.redirect("indexConnected");
  }
);

router.post("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/show", ensureLoggedIn("/login"), (req, res) => {
  res.render("show", {
    user: req.user
  });
});

module.exports = router;
