const express = require("express");
const router = express.Router();
const postModel = require("../models/post");
const cloudinary = require("../options/cloudinary")

router.get("/", (req, res, next) => {
  res.render("post/list-post");
});

router.get("/add", (req, res, next) => {
  postModel
  BiquadFilterNode()
  res.render("posts/add-post");
});

router.post("/add", cloudinary.single('photo'), (req, res, next) => {
  const newPost = new postModel({
    content: req.body.content,
    creatorId: req.user.id,
    picPath: req.file.secure_url,
    picName: req.file.originalname
  });
  newPost.save()
  .then(() => {
    res.redirect("/posts/")
  })
  .catch(err => console.log(err))
});

module.exports = router;
