const express = require('express')
const { ensureLoggedIn } = require('connect-ensure-login')
const Post = require('../models/post')
const User = require('../models/user')
const router  = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/images/' })


router.get('/post/new', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('posts/new');
})

router.post('/post/new', ensureLoggedIn('/login'), upload.single('image'), (req, res, next) => {
  console.log(req)
    const postInfo = {
      content: req.body.content,
      creatorId: res.locals.user._id,
      picPath: req.file.filename,
      picName: req.file.originalname.split('.')[0]
    };

    const newPost = new Post(postInfo);

    newPost.save((err) => {
      if (err) {
          res.render('posts/new', {
          errorMessage: 'Something went wrong. Try again later.'
        })
        return
      }

      res.redirect('/');
    })
})

router.get('/post/:id', (req, res, next) => {
  const postId = req.params.id

  Post.findById(postId)
  .populate('user', 'username')
  .populate('user', 'avatar')
  .exec((err, post) => {
    if (err) {
      next(err)
      return
    }

    res.render('posts/post', {post: post})
  })
})

module.exports = router
