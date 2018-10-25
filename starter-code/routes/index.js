const express = require('express');
const router  = express.Router();

const Post     = require(`../models/Post`),
      $Comment = require(`../models/Comment`);

/* GET home page. */
router.get('/', (req, res, next) => {
  let newPosts = [];
  Post.find({picName: {$exists: true}})
      .sort({'created_at': -1})
      .populate(`creatorId`, `username profile_pic`)
      .then(posts => {
        for (let i = 0; i < posts.length; i++) {
          newPosts.push(posts[i]);
          // console.log(posts[i]._id);
          $Comment.find({post: posts[i]._id})
          .sort({'created_at': -1})
          .then(comments => {
            // console.log(comments);
            newPosts['comments'].push(comments);
            // console.log('1 ', 'newPosts', newPosts);
          })
        }
        // console.log('2 ','newPosts', newPosts);
        res.render('index', { title: 'Express - Generated with IronGenerator', posts, newPosts});
      });
});

module.exports = router;

// res.render('index', { title: 'Express - Generated with IronGenerator', posts })