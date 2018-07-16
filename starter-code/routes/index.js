const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
const Post = require("../models/post");


/* GET home page. */
router.get("/", (req, res, next) => {
  Post.find({})
    .populate("creatorId")
    .then(posts =>
      res.render("index", {
        title: "Express - Generated with IronGenerator",
        posts
      })
    );
});





module.exports = router;
