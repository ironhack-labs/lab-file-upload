const express = require('express');
const router  = express.Router();
const Post       = require('../models/post');
const Comment       = require('../models/comment');
const mongoose           = require('mongoose');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
  .then(post => {
    res.render('index', { post });
  })
  .catch(err => console.log(err));
});

router.get('/post/:id', (req, res, next) => {
  const postID = req.params.id;
  Post.findById(postID)
  .then((post) => {
    Comment.find().populate(postID)
    .then((comments) => {
      console.log(comments);
      res.render('post', { post, comments });
    })
    .catch((err) => {
      console.log(err);
    })


      // if(err) 
      // //this will log all of the users with each of their posts 
      // else console.log(comments);

  })
  .catch(err => console.log(err));
});



module.exports = router;
