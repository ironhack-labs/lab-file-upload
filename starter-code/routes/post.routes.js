const express = require('express');
const router = express.Router();
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')

const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })
// Cloudinary
const uploadCloud = require('../configs/cloudinary.config')
const user = require('../models/User.model')

router.get('/', (req, res) => res.render('post/post-form'))
router.post('/post-form', (req, res, next) => {
    
//console.log('Esto es lo que hace Multer: ', req.file)

  Post.create({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: req.user.picture,
    picName: req.user.username
  })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})

router.get('/comment', (req, res) => res.render('post/comment-form'))
router.post('/comment', (req, res, next) => {
    
//console.log('Esto es lo que hace Multer: ', req.file)

  Comment.create({
    content: req.body.content,
    creatorId: req.user._id,
    picPath: req.user.picture,
    picName: req.user.username
  })
    .then(() => res.redirect('/'))
    .catch(err => next(err))
})



module.exports = router;
