const express = require('express');
const router = express.Router();
const multer = require('multer');
const postUpload = multer({ dest: './public/uploads/postPictures' });
const Post = require('../models/Post.model')
const sessionMiddleware = require('../middlewares/session.middleware')

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

router.get('/post-form', sessionMiddleware.isAuthenticated, (req, res) => res.render('users/post-form'));

router.post('/post-form', sessionMiddleware.isAuthenticated, postUpload.single('picture'), (req, res, next) => {

  req.body.picPath = req.file ? `/uploads/postPictures/${req.file.filename}` : undefined;

  req.body.creatorId = req.session.currentUser._id

  console.log(req.body)

  const newPost = new Post (req.body)

  newPost.save()
    .then(() => res.redirect('/'))
    .catch(next)
})

router.get('/post-list', (req, res, next) => {
  Post.find()
    .limit(20)
    .then((posts) => res.render('post/post-list', {posts}))
    .catch(next)
})

router.get('/post-details/:id', sessionMiddleware.isAuthenticated, (req, res, next) => {
  const postId = req.params.id
  Post.findOne({_id: postId})
    .then((post) => res.render('post/post-details', {post}))
    .catch(next)
})

module.exports = router;



