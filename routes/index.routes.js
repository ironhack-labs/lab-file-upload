const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/Post.model.js');
const routeGuard = require('../configs/route-guard.config');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const uploadMiddleware = multer({ storage: storage });

/* GET home page */
router.get('/', (req, res) => res.render('index', { title: 'App created with Ironhack generator 🚀' }));

router.get('/post', (req, res, next) => {
  res.render('post-form');
});

router.post('/post', uploadMiddleware.single('postPicture'), routeGuard, (req, res, next) => {
  console.log(req.file);
  const picture = req.file.filename;
  console.log(picture);
  const data = req.body;
  console.log('Data:', data);

  Post.create({
    content: data.postContent,
    picPath: picture,
    picName: data.pictureName
    // creatorId: from the session id
  }).then(postFromDB => {
    console.log(postFromDB);
    res.redirect('/');
  });
});

module.exports = router;
