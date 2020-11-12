const fileUploader = require('../configs/cloudinary')
const { getAllPosts, viewPostsCreate, createPost } = require('../controllers/postControllers');
const { Router } = require('express');
const router = new Router();

// router.get('/postForm', (req, res) => {
//
// });
//the GET route to display the post-form,

router.get('/create', viewPostsCreate)
//the POST route to actually create the post (this route should include file uploading),
router.post('/create', fileUploader.single('image'), createPost)
//the GET route to display the posts and
router.get('/posts', getAllPosts)
// the GET route to display post-details.
router.get('/:id/details', fileUploader.single('image'))


module.exports = router;
