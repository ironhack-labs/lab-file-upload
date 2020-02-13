const express = require('express');
const router = express.Router();

const Post = require('../models/post.model')
// const Post = require('../models/comment.model')
/* GET home page. */
router.get('/', (req, res) => {

        Post.find()
          .then(allPost => res.render('index', { allPost}))
          .catch(err => next(err))
      })

module.exports = router;
