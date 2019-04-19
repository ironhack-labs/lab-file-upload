const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const Post = require("../models/post");

router.get("/", (req, res) => {
  Post.find()
    .then(posts => {
      res.render("posts", { posts });
    })
    .catch(error => {
      console.log("Error while getting the posts from the DB: ", error);
    });
});

router.get("/posts/new", (req, res) => {
  res.render("posts/new");
});

router.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      res.render("posts/show", post);
    })
    .catch(error => {
      console.log("Error while getting the posts from the DB: ", error);
    });
});

router.post("/posts", (req, res) => {
  const { content, creatorId, picPath, picName } = req.body;
  const post = {
    content,
    creatorId,
    picPath,
    picName
  };
  const newPost = new Post(post);
  newPost
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/posts/:id/delete", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("no se ha borrado");
    });
});

router.get("/posts/:id/edit", (req, res) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      res.render("posts/edit", post);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/posts/:id", (req, res) => {
  const { content, creatorId, picPath, picName } = req.body;
  const post = {
    content,
    creatorId,
    picPath,
    picName
  };
  const id = req.params.id;
  Post.findByIdAndUpdate(id, post)
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
