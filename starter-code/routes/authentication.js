const express = require("express");
const passport = require("passport");
const multer = require("multer");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/newPost");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const upload = multer({ dest: "./public/uploads/" });

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post("/login", ensureLoggedOut(), (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  })
    .then(data => {
      if (data != null) {
        console.log(data);
        res.render("new", { data });
      }else{
          res.render("authentication/login");
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/signup", ensureLoggedOut(), (req, res) => {
  res.render("authentication/signup", { message: req.flash("error") });
});

router.post("/signup", upload.single("photo"), (req, res) => {
  let user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    picName: req.body.name,
    path: `/uploads/${req.file.filename}`,
    picOriginalName: req.file.photo
  });
  user.save(e => {
    res.redirect("/");
  });
});

router.get("/post", ensureLoggedIn(), (req, res) => {
  User.findOne(req.params.id).then(data => {
    res.render("new", { data });
  });
});

router.post("/post", upload.single("photo"),(req, res) => {
  let post = new Post({
    content: req.body.status,
    creatorId: req.body.id,
    path: `/uploads/${req.file.filename}`,
    picName: req.body.name
  });
  post.save(e => {
      res.redirect("/")
  })
});

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.body.username
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
