const express = require('express');
const multer = require('multer');

const { isLogged } = require('../config/middlewares');
const Post = require('../models/Post');

const router = express.Router();
const upload = multer({ dest: 'public/upload/' });

//CREATE
router.get('/new', isLogged, (req, res, next) => {
  res.render('posts/form', {
    newPost: true,
    form: {
      title: 'Add a new post!',
      action: '/posts/new'
    },
    button: {
      title: 'Post!'
    }
  });
});
router.post('/new', upload.single('picPath'), isLogged, (req, res, next) => {
  const {
    body: { content, picName },
    file: { filename }
  } = req;

  const post = {
    creatorId: req.user._id,
    content,
    picName,
    picPath: `/upload/${filename}`
  };

  Post.create(post)
    .then(post => {
      res.redirect('/posts');
    })
    .catch(err => next(err));
});

// READ
router.get('/', isLogged, (req, res, next) => {
  Post.find()
    .then(posts => {
      res.render('posts/listView', { posts });
    })
    .catch(err => next(err));
});
router.get('/:id', isLogged, (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .then(post => {
      res.render('posts/detailsView', { post });
    })
    .catch(err => next(err));
});

//UPDATE
router.get('/:id/edit', isLogged, (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .then(post => {
      res.render('posts/form', {
        form: {
          title: 'Edit the post!',
          action: `/posts/${id}/edit`
        },
        button: {
          title: 'Edit'
        },
        data: { post }
      });
    })
    .catch(err => next(err));
});
router.post('/:id/edit', isLogged, (req, res, next) => {
  const { id } = req.params;

  Post.findByIdAndUpdate(id, req.body, { new: true })
    .then(post => {
      res.redirect('/posts');
    })
    .catch(err => next(err));
});

//DELETE
router.get('/:id/delete', isLogged, (req, res, next) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id)
    .then(post => {
      res.redirect('/posts');
    })
    .catch(err => next(err));
});

module.exports = router;
