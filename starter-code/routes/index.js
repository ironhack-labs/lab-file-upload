const express = require("express");
const router = express.Router();
const postModel = require("../models/post.js");
const cloudinary = require("../config/cloudinary.js");
const commentModel = require("../models/comments");

/* GET home page. */
router.get("/", (req, res, next) => {
  postModel
    .find()
    .then(dbRes => {
      console.log(dbRes);
      res.render("index", { title: "Irontumblr", post: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/create", (req, res) => {
  if (req.session.currentUser) {
    res.render("post/create");
  } else {
    res.redirect("/");
  }
});

router.post("/create", cloudinary.single("image"), (req, res) => {
  var creatorId = req.session.passport.user;
  var picPath;
  var picName;
  const content = req.body.content;

  if (req.file) {
    picPath = req.file.url;
    picName = req.file.originalname;
  }

  const newPostModel = { content, creatorId, picPath, picName };

  postModel
    .create(newPostModel)
    .then(dbRes => {
      console.log(dbRes);
      res.redirect("/");
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/show/:id", (req, res) => {
  postModel
    .findById(req.params.id)
    .then(dbRes =>
      commentModel
        .find({ postId: dbRes.id })
        .then(response => {
          res.render("post/show", { post: dbRes, comments: response });
        })
        .catch(err => {
          console.log(err);
        })
    )
    .catch(dbErr => console.log(dbErr));
});

router.post("/comment/:id", cloudinary.single("image"), (req, res) => {
  var authorId = req.session.passport.user;
  var picPath;
  var picName;
  const content = req.body.content;
  var postId = req.params.id;

  if (req.file) {
    picPath = req.file.url;
    picName = req.file.originalname;
  }

  const newCommentsModel = { content, authorId, picPath, picName, postId };
  if (req.session.currentUser) {
    commentModel
      .create(newCommentsModel)
      .then(response => res.redirect(`/show/${postId}`))
      .catch(error => console.log(error));
  } else {
    res.redirect(`/show/${postId}`);
  }
});

module.exports = router;
