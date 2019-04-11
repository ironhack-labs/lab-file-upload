const express = require("express");
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Post = require("../models/Post");
const upload = require("../helpers/multer");

router.get("/new", ensureLoggedIn("/login"), (req, res) => {
  res.render("posts/form");
});

router.post("/new", ensureLoggedIn("/login"), upload.single("postFile"),(req, res) => {
  console.log(req.file);
  console.log(req.user.id);
  let {title, content} = req.body;
  let newPost ={
    title,
    content,
    picPath: req.file.url,
    picName: req.file.originalname,
    creatorId: req.user.id
  }
  Post.create(newPost)
  .then(post=>{
    console.log(post);
    res.redirect("/posts/new");
  })
  .catch(err=>{
    console.log(err);
    res.redirect("/");
  })
});

module.exports = router;
