const express = require('express');
const router  = express.Router();
const Post = require('../models/post-model.js');
/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find({},(err,foundPost)=>{
    if (err) {
      next(err);
      return;
    }
    if (foundPost.length < 0) {

      res.render('index', { title1: 'Express - Generated with IronGenerator' });
      return;
    }else {
      res.render('index', { title1: 'Express - Generated with IronGenerator',post:foundPost });

    }

  });
});

module.exports = router;
