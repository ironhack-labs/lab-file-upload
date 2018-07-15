const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const moment = require('moment');

/* GET home page. */
router.get("/", (req, res, next) => {
  Post.find()
    .populate("creatorId")
    .then(posts => {
      posts.forEach(e => {
        e.date = e.createdAt ? moment(e.createdAt).format('MM-DD-YYYY') : "";
      });
      res.render("index", { posts });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
