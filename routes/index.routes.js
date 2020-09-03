const express = require('express');
const router = express.Router();
const {
  viewPostForm,
  createPost,
  listPosts,
  postDetails,
  deletePost
} = require('../controllers/posts')

/* GET home page */
router.get('/', listPosts)

module.exports = router;
