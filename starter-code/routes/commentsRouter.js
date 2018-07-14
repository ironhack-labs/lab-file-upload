const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const Post = require("../models/Post");

const commentsFolder = "/comments/";
const upload = multer({ dest: `uploads/${commentsFolder}` });

router.post("/create/:postId", ensureLoggedIn(), upload.single("image"), (req, res, next) => {
  const { content } = req.body;
  let imagePath;
  let imageName;
  if (req.file) {
    imagePath = commentsFolder;
    imageName = req.file.filename;
  }

  Post.findById(req.params.postId)
    .then(post => {
      const newComment = {
        content,
        imagePath,
        imageName,
        authorId: req.user._id
      };
      post.comments.push(newComment);

      return post.save();
    })
    .then (post => {
      res.redirect(`/posts/${req.params.postId}`);
    })
    .catch(err => {
      req.flash("errorMessage", err.message);
      res.redirect(`/posts/${req.params.postId}`);
    });
});

module.exports = router;
