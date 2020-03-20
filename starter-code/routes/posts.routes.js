const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model.js");
const User = require("../models/User.model.js");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

const multer = require("multer");
const upload = multer({ dest: "public/images" });
const uploadCloud = require("../configs/cloudinary.js");

module.exports = router;

// crud routes

//CREATE
router.get("/create", (req, res) => {
  res.render("posts/create");
});

router.post("/create", uploadCloud.single("photo"), (req, res, next) => {
  console.log("here", req.body, req.file, req.session);
  Post.create({
    title: req.body.title,
    content: req.body.content,
    imgPath: req.file.url,
    imgName: req.file.originalname,
    creatorId: req.session.passport.user
  })
    .then(newPost => {
      // res.redirect(`/`);
      res.redirect(`/post/${newPost.id}`);
    })
    .catch(error => {
      console.log("error", error);
      res.send("error", error);
    });
});

router.get("/post/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("creatorId")
    .then(post => {
      res.render("posts/detail", { post: post });
    });
});

//UPDATE

router.get("/post/:id/update", (req, res) => {
  Post.findById(req.params.id)
    // .populate("creatorId")
    .then(post => {
      res.render("posts/update", {post: post});
    })
    .catch(err => {
      res.render("error", err);
    });
});

router.post("/post/:id/update", (req, res, next) => {
  Post
  .findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  })
    .then(post => {
      res.redirect(`/post/${req.params.id}`);
    })
    .catch(err => {
      res.render("error", err);
    });
});


//DELETE
router.get("/post/:id/delete", (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("this is an error", err);
      res.send("error", err);
    });
});
