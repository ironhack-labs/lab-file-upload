const express = require("express")
const router = express.Router()
const {
  viewPostForm,
  createPost,
  listPosts,
  postDetails,
  deletePost
} = require('../controllers/posts')

router.get('/posts', listPosts)
router.get('/posts', viewPostForm)
router.get('/posts/:postId', postDetails)
router.post('/posts/new', createPost)
router.get('/post/:postId/delete', deletePost)