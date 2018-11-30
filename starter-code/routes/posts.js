const express = require('express');
  const router = express.Router();
  const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
  const multer = require('multer');
  const upload = multer({ dest: './public/uploads/' });
  const post = require('../models/post');




  router.get('/new-post', ensureLoggedIn('/login'), (req, res) => {
      res.render('new-post');
  });

  router.post('/new-post', [ensureLoggedIn('/login'), upload.single('photo')], (req,res) => {
      const {content} = req.body;
      const picpath = `uploads/${req.file.filename}`;
      const picname = req.file.originalname;
      const newPost = new post({
          content,
          creatorId: req.user._id,
          picpath,
          picname
      });
      newPost.save()
      .then(() => res.redirect('/profile'));

  });







module.exports = router;