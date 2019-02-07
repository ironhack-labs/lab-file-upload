const express = require('express');
const router = express.Router();
const Post = require("../models/post")
const cloudinary = require("../config/cloudinary")
const PhotoComment = require("../models/comment")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/", (req, res, next) => {
  Post.find({})
    .populate("comments")
    .then(posts => res.render("posts/list-post", { posts }))
    .catch(err => console.log(err))
})

router.get("/add", ensureLoggedIn('/login'), (req, res, next) => {
  res.render("posts/add-post")
})

router.post("/add", cloudinary.single("photo"), (req, res, next) => {
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user.id,
    picPath: req.file.secure_url,
    picName: req.file.originalname
  })
  newPost.save()
    .then(() => res.redirect("/posts/"))
    .catch(err => console.log(err))
})

router.post("/add-comment/:id", cloudinary.single("photo"), (req, res, next) => {
  const newComment = new PhotoComment({
    content: req.body.content,
    authorId: req.user._id,
    imagePath: req.file.secure_url,
    imageName: req.file.originalname
  })
  newComment.save()
    .then(comment => {
      Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } })
        .then(() => {
          console.log("the comment was published")
          res.redirect("/posts/")
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;