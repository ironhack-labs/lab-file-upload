const express = require('express');
const router = express.Router();
const Post = require("../models/post")
const cloudinary = require("../config/cloudinary")

router.get("/", (req, res, next) => {
  Post.find()
    .then(posts => res.render("posts/list-post", { posts }))
    .catch(err => console.log(err))
})

router.get("/add", (req, res, next) => {
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

module.exports = router;