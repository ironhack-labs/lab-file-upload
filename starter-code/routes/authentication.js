const express = require("express");
const passport = require("passport");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const Post = require("../models/Post");
const ProfilePic = require("../models/ProfilePic");
const User = require("../models/user");
const Comment = require("../models/Comment")
const upload = multer({ dest: "./public/uploads/" });

router.get("/login", ensureLoggedOut(), (req, res) => {
  res.render("authentication/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local-login", {
    successRedirect: "/profile",
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

router.post(
  "/profile/upload",
  [upload.single("profilePic"), ensureLoggedIn("/login")],
  function(req, res) {
    let currUser = req.user;
    let picFile = req.file.filename;

    const pic = new ProfilePic({
      authorId: currUser._id,
      content: req.body.content || "",
      imgPath: `/uploads/${picFile}`,
      imgName: `${picFile}`
    });
    pic
      .save()
      .then(pic => {
        User.findOneAndUpdate({ _id: req.user.id }, { imgPath: pic.imgPath }, {new:true})
        .then(user => {
          res.redirect("/profile");
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
);

router.get("/post", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/post");
});

router.post(
  "/post",
  [upload.single("pic"), ensureLoggedIn("/login")],
  function(req, res) {
    let currUser = req.user;
    let picFile = req.file.filename;

    const pic = new Post({
      authorId: currUser._id,
      content: req.body.content || "",
      imgPath: `/uploads/${picFile}`,
      imgName: `${picFile}`
    });
    pic
      .save()
      .then(pic => res.redirect("/")
      .catch(err => {
        console.log(err);
      }))
  }
);

router.get("/profile", ensureLoggedIn("/login"), (req, res) => {
  res.render("authentication/profile", {
    user: req.user
  });
});
router.get("/:id", ensureLoggedIn("/login"), (req, res) => {
  let post = req.params.id;
  res.render("postDetail", {post});
});

router.get("/logout", ensureLoggedIn("/login"), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
