const { Router } = require('express');
const router = new Router();
const {
  viewPostForm,
  createPost,
  listPosts,
  postDetails,
  deletePost
} = require('../controllers/posts')

router.get('/posts', listPosts)
router.get('/posts/new', viewPostForm)
router.post('/new', createPost)
router.get('/posts/:postId', postDetails)
router.get('/post/:postId/delete', deletePost)