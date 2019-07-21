const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comments = require("../models/comment");

/* GET home page. */
router.get("/", (req, res, next) => {
  let user = req.user;
  // console.log(user)
  Post.find()
    .populate("comments")
    .then(post => {
      Comments.find().then(comments => {
        console.log(post);
        res.render("index", { comments, post, user });
      });
    })
    .catch(error => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
