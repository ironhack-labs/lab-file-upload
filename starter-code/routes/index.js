const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find().
    then(posts => {
      console.log(posts)
      res.render('home/home', { posts })
    }).catch(err => console.log(err))
})

module.exports = router;
