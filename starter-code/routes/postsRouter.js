const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("connect-ensure-login");
const multer = require("multer");
const Post = require("../models/Post");
const moment = require('moment');

const postsFolder = "/posts/";
const upload = multer({ dest: `uploads/${postsFolder}` });

router.get("/", ensureLoggedIn(), (req, res, next) => {
  Post.find({ creatorId: req.user._id })
    .populate("creatorId")
    .then(posts => {
      posts.forEach(e => {
        e.date = e.createdAt ? moment(e.createdAt).format('MM-DD-YYYY') : "";
        e.canRemove = true;
      });
      res.render("post/index", { posts });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/create", ensureLoggedIn(), (req, res) => {
  res.render("post/create");
});

router.post("/create", ensureLoggedIn(), upload.single("picture"), (req, res) => {
  const { content } = req.body;
  let picPath;
  let picName;
  if (req.file) {
    picPath = postsFolder;
    picName = req.file.filename;
  }

  const checkFile = new Promise((resolve, reject) => {
    if (!picPath || !picName) {
      reject(new Error("Choose a picture."));
    } else {
      resolve();
    }
  });

  checkFile.then(() => {
    const newPost = new Post({
      content,
      picPath,
      picName,
      creatorId: req.user._id
    });

    return newPost.save();
  })
  .then (post => {
    res.redirect("/posts");
  })
  .catch(err => {
    res.render("post/create", {
      errorMessage: err.message
    });
  });
});

router.get("/delete/:id", ensureLoggedIn(), (req, res) => {
  Post.findByIdAndRemove(req.params.id, () => res.redirect("/posts"));
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .populate("creatorId")
    .then(post => {
      post.date = post.createdAt ? moment(post.createdAt).format("MM-DD-YYYY") : "";

      res.render("post/show", { post });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
