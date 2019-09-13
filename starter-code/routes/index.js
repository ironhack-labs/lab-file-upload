const express = require('express');
const router = express.Router();
const uploadCloud = require('./../config/multer');
const { catchErrors, isLoggedIn } = require('./../middleware/');
const {
  uploadProfileImage,
  getAllPosts,
  getOnePost,
  getPostForm,
  createPost,
  createComment
} = require('./../controllers/index.controller');

router.get('/', catchErrors(getAllPosts));

router.post('/user/:id/upload-profile', uploadCloud.single('profile'), catchErrors(uploadProfileImage));

router.get('/post/add', isLoggedIn, getPostForm);
router.post('/post/add', isLoggedIn, uploadCloud.single('picture'), createPost);
router.get('/post/:id', catchErrors(getOnePost));

router.post('/post/:id/add-comment', uploadCloud.single('picture'), isLoggedIn, createComment);

module.exports = router;
