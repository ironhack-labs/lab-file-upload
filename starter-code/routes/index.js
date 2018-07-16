const express = require('express');
const router = express.Router();
const Post = require("../models/post");
const User = require('../models/user');

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

/* router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Post.find()
        .populate("creatorId")
        .then(posts => {
          posts.forEach(e => {
            e.hasUser = true;
            e.userId = req.params.id;
          })
          res.render('index', { user, posts })
        })
    })
    .catch(err => {
      next(err);
    });
}); */

module.exports = router;
