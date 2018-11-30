const express = require('express');
  const router = express.Router();
  const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
  const multer = require('multer');
  const upload = multer({ dest: './public/uploads/' });
  const post = require('../models/post');
  const comment = require('../models/comment');

  router.get('/new-comment/:postId', ensureLoggedIn('/login'), (req,res) => {
      const {postId} = req.params;
      post.findById(postId)
      .then(post => res.render('new-comment', {post}))
      .catch(e => console.log(e));
  });



  module.exports = router; 