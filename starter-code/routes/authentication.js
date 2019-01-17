const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
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

router.get("/new", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/newPost", {
    user: req.user
  });
});

const upload = multer({ dest: "./public/uploads" });

router.post("/new", upload.single("photo"), (req, res) => {
  const post = new Post({
    creatorId: req.user.username,
    content: req.body.content,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.file.originalname
  });

  post.save().then(err => {
    res.redirect("/");
  });
});

router.get("/showPost/:postId", (req, res) => {
  Post.find({
    _id: req.params.postId
  })
    .then(posts => {
      res.render("showPost", { posts });
    })
    .catch(err => {
      console.log(err, "this was an error");
    });
});

router.get("/:postId/newComment", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/newComment", {
    user: req.user
  });
});

router.post("/showPost/:postId", (req, res) => {
  Post.update(
    {
      _id: req.params.postId
    },
    { creatorId: req.user, content: req.body.content }
  ).then(() => {
    res.redirect("/showPost/:postId", (req, res) => {
      Post.find({
        _id: req.params.postId
      })
        .then(posts => {
          res.render("showPost", { posts });
        })
        .catch(err => {
          console.log(err, "this was an error");
        });
    });
  });
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
