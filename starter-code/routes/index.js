const express = require("express");
const router = express.Router();
const Post = require("../models/newPost");

/* GET home page. */
router.get("/", (req, res, next) => {
  Post.find().then(data => res.render("index",{ data }));
});

module.exports = router;
