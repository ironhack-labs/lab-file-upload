const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const uploadCloud = require("../config/cloudinary.js");
const Post = require("../models/post.js");

/* GET home page. */
router.get("/", (req, res, next) => {
  Post.find().then(posts => {
    res.render("index", {
      title: "Express - Generated with IronGenerator",
      user: req.user,
      posts
    });
  });
});

router.get("/add-post", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("posts/add");
});

router.post(
  "/add-post",
  ensureLoggedIn("/login"),
  uploadCloud.single("photo"),
  (req, res, next) => {
    Post.create({
      content: req.body.content,
      creatorId: req.user._id,
      picPath: req.file.url,
      picName: req.file.originalName
    }).then(() => {
      res.redirect("/");
    });
  }
);

router.post(
  "/add-comment",
  ensureLoggedIn("/login"),
  uploadCloud.single("photo"),
  (req, res, next) => {
    console.log(req.body)
    let { content, postId } = req.body;
    let url = req.file ? req.file.url : "";
    let originalName = req.file ? req.file.originalname : "";
    console.log(req.user._id)

    let comment = {
      content,
      authorId: req.user._id,
      imagePath: url,
      imageName: originalName
    };

    Post.findByIdAndUpdate(postId, {
      $push: {
        comments: comment
      }
    }).then(() => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
  }
);

module.exports = router;
