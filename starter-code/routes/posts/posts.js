const express = require('express');
const router  = express.Router();
const Post = require('../../models/Post')

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then(posts=>{
    res.render('posts/list',{posts})
  })
  .catch(err=>{
    console.log(err)
  })
});

module.exports = router;