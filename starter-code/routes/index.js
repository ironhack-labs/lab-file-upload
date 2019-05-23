const express = require('express');
const router  = express.Router();
const Post = require('../models/post')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then (posts => res.render('index', { posts, user: req.user}))
    .catch(error => console.log(error))
});



module.exports = router;
