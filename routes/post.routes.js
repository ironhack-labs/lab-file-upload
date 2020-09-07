const express = require('express');
const router = express.Router();
const User = require('../models/User.model');

const routeGuard = require('../configs/route-guard.config');

const upload = require('../configs/cloudinary')

const {
    getPosts,
    getPost,
    postPost,
    addPost
} = require('../controllers/post')

router.get('/', getPosts);
router.get('/posts', getPosts);
router.post('/posts', routeGuard, upload.single('image'), postPost);
router.get('/posts/new', routeGuard, addPost)
router.get('/posts/:postId', getPost);

module.exports = router;