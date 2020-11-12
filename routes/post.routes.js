const express = require('express');
const router = express.Router();
const routeGuard = require('../configs/route-guard.config');
const fileUploader = require('../configs/cloudinary.config')


const {
    postFormView,
    postFormSend,
    postsView,
    postDetails
} = require('../controllers/posts')

router.get('/post-form', routeGuard, postFormView);
router.post('/post-form', routeGuard, fileUploader.single('image'), postFormSend);
router.get('/posts', postsView);
router.get('/posts/:id/details', postDetails);

module.exports = router;