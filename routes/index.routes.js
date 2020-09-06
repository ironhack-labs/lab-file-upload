const { Router } = require('express');
const router = new Router();
const catchErrors = require('../configs/catch-errors')
const routeGuard = require('../configs/route-guard.config')

const {
  viewPostForm,
  createPost,
  listPosts,
  postDetails,
  createComment,
  deletePost
} = require('../controllers/posts');

const upload = require('../configs/cloudinary');

/* GET home page */
router.get('/', listPosts);
router.get('/posts/new', routeGuard, viewPostForm);
router.post('/posts/new', routeGuard, upload.single('postImage'), createPost);
router.get('/posts/:postId', routeGuard, postDetails);
router.post('/posts/show/:postId', routeGuard, upload.single('imagePath'), catchErrors(createComment));
router.get('/posts/:postId/delete', routeGuard, deletePost);


module.exports = router;
