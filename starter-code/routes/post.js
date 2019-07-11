const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const router = express.Router();
const multer = require('multer');
const Post = require('../models/post');
const Comment = require('../models/comment')

const upload = multer({ dest: '../public/uploads' });


/* GET home page. */
router.get('/new', ensureLoggedIn(), (req, res, next) => {
  const { id } = req.user;
  res.render('post/new', { id });
});

router.post('/new', upload.single('picpath'), (req, res, next) => {
  const {
 content, id, picname 
} = req.body;

  const picpath = `/uploads/${req.file.filename}`
  Post.create(new Post({
    content,
    id,
    picname,
    picpath,
  }))
    .then(() => {
    res.redirect('/');
    })
    .catch(err => console.log(err));
});

router.get('/edit/:id', ensureLoggedIn(), (req, res, next) => {
  const id = req.params.id
  Post.findById(id)
    .then((post)=>{
      res.render('post/edit', post);
    })
    .catch(err => console.log(err));
});

router.get('/delete/:id', ensureLoggedIn(), (req, res, next) => {
  const id = req.params.id
  Post.findByIdAndRemove(id)
    .then(()=>{
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

router.get('/comment', ensureLoggedIn(), (req, res, next) => {
  const { id } = req.user;
  res.render('post/comment', {id})
});

router.post('/comment', upload.single('picpath'), (req, res, next) => {
  const {
 content, id, picname 
} = req.body;

  const picpath = `/uploads/${req.file.filename}`
  Comment.create(new Comment({
    content,
    id,
    picname,
    picpath,
  }))
    .then(() => {
    res.redirect('/');
    })
    .catch(err => console.log(err));
});

router.get('/showcomment', ensureLoggedIn(), (req, res, next) => {
  Comment.find()
  .then((comment) =>{
    res.render('post/showcomment', {comment});
  })
  .catch((err) => console.log(err))

});


module.exports = router;
