const express = require('express');
const router = express.Router();
const multer = require('multer');
const Picture = require('../models/pictures');
const Post = require('../models/post');
const User = require('../models/user');
const upload = multer({
  dest: './public/uploads/'
});
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find().populate('picture').exec((err, posts) => {
    res.render('index', {
      posts
    });
  });
});
router
  .post('/upload/:userId', upload.single('photo'), function (req, res, next) {

    const pic = new Picture({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });

    pic.save((err) => {

      User.findById(req.params.userId, (err, user) => {
        if (err) return next(err);
        user.profileImage = pic._id;
        user.save((err) => {
          if (err) return next(err);
          res.redirect('/');
        });
      });
    });
  });

module.exports = router;