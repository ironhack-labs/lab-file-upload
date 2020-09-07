const express = require('express');
const router = express.Router();

const routeGuard = require('../configs/route-guard.config');
const fileUploader= require('../configs/cloudinary')

const {
  addPost,
  postPost,
  showPosts,
  getPost,
 
} = require('../controllers/post')

const { newComment } = require('../controllers/comments')

//========POSTS========


//1. the GET route to display the post-form,
router.get('/post/new', routeGuard, addPost)
//2. the POST route to actually create the post (this route should include file uploading),
router.post('/post/new', routeGuard, fileUploader.single('new-image'), postPost);
//3. the GET route to display the posts and
router.get('/all', showPosts);
//4. the GET route to display post-details.
router.get('/all/:postId', getPost);

//========COMMENTS========

router.post('/posts/:postId/comment', routeGuard, upload.single('comment-image'), newComment)



module.exports = router;