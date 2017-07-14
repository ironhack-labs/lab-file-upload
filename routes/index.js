const express = require('express');
const Post    = require('../models/post.js');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('HOME ~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  console.log('SESSION (from express-session)', req.session);
  // created by express-session middleware

  console.log('USER (from Passport)', req.user);
  // created by Passport
  // Render a completely
  // ensure.ensureLoggedIn('/login'),
      Post.find(
      // { creatorId: req.user._id },
      (err, postsList) => {
        if (err) {
          next(err);
          return;
        }
        res.render('index', {
          posts: postsList,
          successMessage: req.flash('success'),
          // passportSuccess: req.flash('success')
          //                             |
        });    //        default success message key from passport
  });
} );


module.exports = router;
