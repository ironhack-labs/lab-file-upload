const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({})
  .populate("creatorId", "username")
    .then((posts) => {
      res.render('index', { posts });
    })
    .catch((err)=>console.log(err));
});


router.use('/', require('./authentication'));
router.use('/post', require('./postRoute'));
module.exports = router;
