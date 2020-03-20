const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model.js");
const uploadCloud = require('../configs/cloudinary.js');


/* GET home page. */
// app.get('/', (req, res) => res.render('index', { title: 'Express - Generated with IronGenerator' }));

router.get("/", (req, res) => {
  Post.find()
  .populate("creatorId")
    .then(posts => {
      res.render("posts/posts.hbs", { posts: posts });
    })
    .catch(err => {
      res.render("error", err);
    });
});

module.exports = router;
