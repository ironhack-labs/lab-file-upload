/* jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
    Post.find((err, posts) => {
        if (err) return next(err);
        const ids = posts.map((post) => {
          return post.creatorId;
        });
        User.find({'_id' : {$in : ids}}, 'id username profilePic.picPath', (err, idDocs) => {
          if (err) return next(err);
          console.log(idDocs);
          posts.forEach((post) => {
            const creatorStuff = idDocs.find((idDoc) => {
              console.log('idDoc.id: ', idDoc.id, ' post.creatorId: ', post.creatorId);
              console.log(typeof(idDoc.id), typeof(post.creatorId));
              return idDoc.id === String(post.creatorId);
            });
            console.log('creatorStuff', creatorStuff);
            post.creatorName = creatorStuff.username;
            post.creatorPic = creatorStuff.profilePic.picPath;
          });
          res.render('index', {
            isLoggedIn: req.isAuthenticated(),
            posts
          });
        });
    });
});

module.exports = router;
