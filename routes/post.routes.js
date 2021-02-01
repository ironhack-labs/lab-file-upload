const { Router } = require('express');
const router = new Router();
const Post = require('../models/Post.model');

const routeGuard = require('../configs/route-guard.config');
const uploadMiddleware = require('../middleware/file-upload');

router.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

router.post(
  '/create',
  routeGuard,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    const data = req.body;
    let image;
    image = req.file.path;

    Post.create({
      content: data.content,
      creatorId: req.user._id,
      image: image
    })
      .then(post => {
        res.render('post/home');
      })
      .catch(error => {
        next(error);
      });
  }
);

// router.get('/posts', routeGuard, (req, res, next) => {
//   res.render('post/home');
// });

// router.get('/posts/:id', (req, res, next) => {
//   const id = req.params.id;
//   Post.findById(id)
//     .then(post => {
//         res.render('post/post-details', { post: post });
//     })
//     .catch(error => {
//       next(error);
//     });
// });




module.exports = router;
