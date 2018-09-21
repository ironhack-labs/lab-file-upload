const express = require("express");
const passport = require("passport");
const postRouter = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Post = require("../models/post");

postRouter.get("/new", (req, res) => {
  res.render("authentication/new_post", { user: req.user });
});

postRouter.post("/new", [ ensureLoggedIn(), upload.single('picPath')], (req, res) => {
  const { content } = req.body;
  const creatorId = req.user.id
  const picPath = req.file.path;
  const post = new Post({ creatorId, content, picPath });
  post.save().then(post => {
    console.log("Nuevo post creado");
    console.log(post);
    res.redirect("/");
  });
});

module.exports = postRouter;