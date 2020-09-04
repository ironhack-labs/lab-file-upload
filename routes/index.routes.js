const { Router } = require('express');
const router = new Router();
const {
  viewPostForm,
  createPost,
  listPosts,
  postDetails,
  deletePost
} = require('../controllers/posts')

/* GET home page */
router.get('/', listPosts)
router.get('/new', viewPostForm)
router.post('/new', createPost)


// router.get('/posts', listPosts)
// router.get('/posts/new', viewPostForm)
// router.post('/new', createPost)
// router.get('/posts/:postId', postDetails)
// router.get('/post/:postId/delete', deletePost)
module.exports = router;
