require('dotenv');
const express = require('express');
const router  = express.Router();
const Post = require("../models/Post");





/* GET home page */
router.get('/', (req, res, next) => {
  Post.populate("/models/User")

  res.render('index'), {post: req.post};
});


router.get("/userPage", (req, res, next) => {
  res.render("userPage", { user: req.user });
});






module.exports = router;
