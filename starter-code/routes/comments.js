const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

router.get("/comments/:id", ensureLoggedIn(), (req, res, next) => {
  Post.findById(req.params.id)
    .populate("creatorId", "username")
    .then(post => {
      res.render("comments/new", post);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/comments/:id/new", upload.single("image"), (req, res, next) => {
  let newComment = {
    content: req.body.comment,
    authorId: req.params.id
  };

  if (req.file) {
    newComment.imagePath = `uploads/${req.file.filename}`;
    newComment.imageName = req.file.originalname;
  }

  Post.findById(req.params.id).then(post => {
    //console.log(req.params.id);
    console.log(newComment);
    console.log(post)
    post.comments.push(newComment);
    post.save();
  }).then(() => {
      console.log("Posted");
      res.redirect("/posts");
    });
  });

module.exports = router;