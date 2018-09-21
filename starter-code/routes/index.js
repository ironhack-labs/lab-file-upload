const express = require("express");
const router = express.Router();
const Post = require("../models/post");
/* GET home page. */
router.get("/", (req, res, next) => {
  const { username, image } = req.user ? req.user : false;
  Post.find()
      .populate('creatorId')
      .populate('comments.authorId')
    .then(posts => {
      res.render("index", {
        title: "Express - Generated with IronGenerator",
        username,
        image,
        posts
      });
    })
    .catch(e => next(e));
});

module.exports = router;
