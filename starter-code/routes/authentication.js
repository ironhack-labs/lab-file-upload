const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");
const Comment = require('../models/comment');

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
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);
router.post('/profile/comment', ensureLoggedIn(), (req, res, next) => {
  const authorId = req.user.id;
  const content = req.body.comment;
  console.log(req.body);
  const newComment = new Comment({
      content,
      authorId,
  })

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

router.post(
  "/editPic",
  ensureLoggedIn("/login"),
  uploadCloud.single("photo"),
  (req, res) => {
    const { url } = req.file;
    const { id } = req.body;
    User.findByIdAndUpdate({ id }, { imgPath: url }, { new: true })
      .then(() => redirect("/profile"))
      .catch(err => console.log(err));
  }
);

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

newComment.save()
.then(comment => {
    Post.findByIdAndUpdate({ _id: req.body.postId }, { $push: { comments: comment._id } })
        .then(() => {
            res.redirect('/');
        })
})
.catch(err => console.log(err));
});




router.get('/profile', ensureLoggedIn('/login'), (req, res) => {

Post.find({ idUser: req.user._id })
.then(post => {
    res.render('authentication/profile', { post, user: req.user });
})
.catch(error => {
    console.error(err);
    next(err);
})

module.exports = router;
