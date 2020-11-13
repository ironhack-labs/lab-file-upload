const express = require('express');
const router = express.Router();
const {
  getPostForm,
  createPost,
  displayPosts,
  postDetails
} = require('../controllers/post')
const fileUploader = require('../configs/cloudinary');

router.get('/new-post', getPostForm)

router.post('/new-post', fileUploader.single('image'), createPost)

router.get('/', displayPosts)

router.get('/:id', postDetails)

module.exports = router
