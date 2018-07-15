const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Post = require('../models/post');

router.get('/post', ensureLoggedIn(),(req, res, next) => {
  Post.find({})
    .then(post=>{
      res.render('post/show', {post});
    })
    .catch(e=>console.log(e.message));
})


router.get('/create', ensureLoggedIn(),(req, res, next) => {
  res.render('post/create');
})

router.post('/create', [ensureLoggedIn(), upload.single('picture')], (req, res, next) => {
  const {content} = req.body;
  console.log(req.file)
  const newPost = new Post({
    content,
    creatorId: req.user._id,
    picPath: `/uploads/${req.file.filename}`,
    picName: req.file.originalname,
  })
  console.log("ajaja")
  
  newPost.save()
  .then(data => res.redirect('/'))
  .catch(err => console.log(err.message));
})

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
  .populate('creatorId')
  .populate({
      path: 'comments',
      populate: {
          path: 'authorId'
      }
  })
  .then(post => {
    res.render('post/show', {post})
  })
})

module.exports = router;