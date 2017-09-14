const express = require('express');
const router  = express.Router();
const moment = require("moment");

const Post = require("../models/post");

/* GET home page. */
router.get('/', (req, res, next) => {
  const userIsLoggedIn = req.user
  Post.find({})
  .then( posts => {
    res.render('index', {
      title: 'Express - Generated with IronGenerator',
      user:userIsLoggedIn,
      posts,
      moment
    })
  }).catch( err => next(err))
});

module.exports = router;
