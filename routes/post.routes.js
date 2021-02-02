const { Router } = require('express');
const router = new Router();
const Post = require('../models/Post.model');

const routeGuard = require('../configs/route-guard.config');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const uploadMiddleware = multer({ storage: storage });

router.get('/home', (req, res) => {
  res.render('post/home');
});

router.get('/post-form', routeGuard, (req, res, next) => {
  res.render('post/create');
});

router.post(
  '/post-form',
  routeGuard,
  uploadMiddleware.single('image'),
  (req, res, next) => {
    const data = req.body;
    let image;
    image = req.file.path;

    Post.create({
      content: data.content,
      // creatorId: req.user._id,
      picPath: image,
      picName: data.picName
    })
      .then(() => {
        // req.session.userId = user._id;
        res.redirect('/home');
      })
      .catch(error => {
        next(error);
      });
  }
);


router.get('/post/:id', (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
        res.render('post/post-details', { post: post });
    })
    .catch(error => {
      next(error);
    });
});




module.exports = router;
