const express = require('express');
const router  = express.Router();

const uploadCloud = require('../config/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/user');
const Post = require('../models/post');

/* GET posts page. */
router.get('/posts', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('posts/index', req.user);
});

router.post('/create-post', [ensureLoggedIn('/login'), uploadCloud.single('photo')] ,(req,res,next)=>{
  const {content} = req.body;
  const creatorId = req.user._id;
  const picPath = req.file.url;
  const picName = req.file.originalname;

  console.log(`${content}, ${creatorId}, ${picPath}, ${picName}`);

  let newPost = new Post({content, creatorId, picPath, picName});

  console.log(newPost);

  newPost.save()
  .then(()=>{
    res.redirect('/show-posts');
  })
  .catch((err)=>{
    return err
  })
})

router.get('/show-posts', (req, res, next) => {
  res.render('posts/posts', req.user);
});

module.exports = router;