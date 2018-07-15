const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

router.get("/posts", (req, res, next) => {
  Post.find()
    .populate("creatorId", "username")
    .sort({ updated_at: -1 })
    .then(posts => {
      console.log(posts)
      res.render("posts/index", { posts });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/posts/new", ensureLoggedIn(), (req, res, next) => {
  res.render("posts/new");
});

router.post(
  "/posts/new",
  ensureLoggedIn(),
  upload.single("image"),
  (req, res, next) => {
    const newPost = new Post({
      content: req.body.content,
      creatorId: req.user._id,
      picPath: `uploads/${req.file.filename}`,
      picName: req.file.originalname
    });

    newPost.save().then(() => {
      console.log("Posted");
      res.redirect("/posts");
    });
  }
);

module.exports = router;