const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/post");
const upload = multer({ dest: "./public/uploads/" });
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/add", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("post");
});

router.post("/add", [ensureLoggedIn('/login'), upload.single("picture-post")], (req, res, next) => {
  //console.log(req.body)
  const content = req.body.content;
  const creatorId = req.user._id;
  const picPath = `/uploads/${req.file.filename}`
  const picName = req.file.originalname;
  new Post({ content, creatorId, picPath, picName })
    .save()
    .then(() => {
      res.redirect("/")
    })
    .catch(e => console.log(e))
});
router.get("/:id", (req, res, next) => {
  //console.log(req.params.id)
  let postId = req.params.id;
  Post.findById({_id :postId})
    .then( post => {
      console.log(post)
      res.render("show", {post});
    })
    .catch( e => console.log(e))
});

module.exports = router;
