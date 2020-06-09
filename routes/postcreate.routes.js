const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const Post = require('../models/Post.model');

const mongoose = require('mongoose');

var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

const routeGuard = require('../configs/route-guard.config');


router.post('/create-post',upload.single("picture"),(req, res) => {
  const creator = req.session.currentUser._id;
  const title = req.body.title;
  const content = req.body.content;
  const picName = req.file.filename;
  const origName = req.file.originalname;
  const picPath = req.file.path;
  Post.create({
    creator,
    title,
    content,
    picName,
    origName,
    picPath
  })
  .then(postFromDb => {
    console.log(`Newly created post is: ${postFromDb}`);
    res.redirect(`/postdetails?id=${postFromDb._id}`);
  })
})


router.get('/create-post', (req, res) => res.render('post/post-form'));

module.exports = router;
