const express = require('express');
const router  = express.Router();
const Post = require("../models/post");

/* GET home page. */
router.get("/", (req, res, next) => {
  Post.find()
    .populate("creatorId")
    .then(posts => {
      res.render("index", { posts });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
