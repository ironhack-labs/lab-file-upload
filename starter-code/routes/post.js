const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const Post = require("../models/post");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/newPost", ensureLoggedIn('/login'),(req, res, next) => {
  res.render("newPost");
});

router.post("/newPost",[ ensureLoggedIn('/login'),upload.single("post-photo")], (req, res, next) => {
  console.log(req.file);
  const creatorId = req.user._id
  const content = req.body.content;
  const picPath = req.file.filename;
  const picName = req.file.originalname;
  console.log(req.user)
  new Post({ creatorId,content, picPath, picName }).save().then(post => {
    console.log("Post sucessfully created!");
    res.redirect("/")
  });
});

router.get("/:id", (req, res, next) => {
  Post.find({_id:req.params.id})
    .populate("creatorId")
    .populate({
      path: "comments",
      populate: {
        path: "authorId"
      }
    })
    .then(post => {
      console.log(post[0])
      res.render("showPost", { post: post[0] });
    })
    .catch(err => console.log(err))
});

module.exports = router;
