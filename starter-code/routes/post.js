const express = require('express');
const router = express.Router();
const Picture = require('../models/picture');
const Post = require('../models/post');
const {ensureLoggedIn} = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({dest: './uploads'});

/* GET home page. */
router.get('/posts', ensureLoggedIn('/login'), (req, res, next) => {
  Post.find({}).populate('img').populate('creatorId')
    .then(post => {
      res.render('post/list', { post })})
    .catch(e => console.log(e));
});

router.post('/posts', ensureLoggedIn('/login'), upload.single('img'), (req, res, next) => {
  const postImg = new Picture({
    path: `/uploads/${req.file.filename}`,
    originalName: req.file.originalname
  })
  const newPost = new Post({
    content: req.body.content,
    creatorId: req.user,
    img: postImg
  });
  postImg.save()
    .then(()=>{
      newPost.save()
        .then(()=>{
          res.redirect('/');
        })
    })
    .catch(e=>console.log(e));
})

router.get('/posts/:id', ensureLoggedIn('/login'), (req,res,next)=>{
  Post.findById(req.params.id).populate('comments').populate('img').populate('creatorId')
    .then(post =>{
      res.render('post/post', post)
    })
    .catch(e=>console.log(e));
})


module.exports = router;