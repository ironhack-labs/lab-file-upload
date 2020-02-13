const express = require('express');
const passport = require('passport');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require('../models/User.model')
const Post = require('../models/Post.model')
const Comment = require('../models/Comment.model')

// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })

// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')

router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('authentication/login', { message: req.flash('error') });
});

router.post(
  '/login',
  ensureLoggedOut(),
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/signup', ensureLoggedOut(), (req, res) => {
  res.render('authentication/signup', { message: req.flash('error') });
});

router.post(
  '/signup',
  ensureLoggedOut(),
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })
);

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/profile', {
    user: req.user
  });
});

router.get('/create', ensureLoggedIn('/login'), (req, res) => {
  res.render('authentication/create', {
    user: req.user
  });
});
router.post('/create', uploadCloud.single('phototoupload'), (req, res, next) => {
  console.log("Y esto es lo que hace multer cuando colabora con Cloudinary", req.file)
  User.findByIdAndUpdate(req.user.id, { image: req.file.secure_url })
    .then(() => res.redirect('/profile'))
    .catch(err => next(err))
});

router.get('/posts', (req, res, next) => {
  Post.find()
    .then(allPosts => res.render('authentication/posts', { allPosts }))
    .catch(err => next(err))
})

router.get('/posts/create', (req, res, next) => {
  Post.find()
    .then(allPosts => res.render('authentication/create-post', { allPosts }))
    .catch(err => next(err))
})
router.post('/posts/create', uploadCloud.single('phototoupload'), (req, res, next) => {

  const newEntry = {
    content: req.body.description,
    creatorId: req.user._id,
    picPath: req.file.secure_url,
    picName: req.file.originalname
  }

  Post.create(newEntry)
    .then(() => res.redirect('/posts'))
    .catch(err => next(new Error(err)))
})







//creación de comentarios

router.post('/posts/details/:postId', uploadCloud.single('phototoupload'), (req, res, next) => {
  const postId = req.params.postId
  const newComment = {

    content: req.body.content,
    authorId: req.user._id,
    postId: postId,
    picPath: req.file.secure_url,
    picName: req.file.originalname
  }

  Comment.create(newComment)
    .then(() => res.redirect('/posts'))
    .catch(err => next(new Error(err)))
})

// Detalle de posts
router.get('/posts/details/:postId', (req, res) => {
  const postId = req.params.postId
  const postPromise = Post.findById(postId)
  const commentPromise = Comment.find({ postId: `${postId}` })

  Promise.all([postPromise, commentPromise])
    .then(x => res.render('authentication/details', { post: x[0], comment: x[1] }))
    .catch(err => console.log("Error consultando los detalles del post en la BBDD: ", err))
})




router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
