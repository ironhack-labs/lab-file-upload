const express = require('express');
const router  = express.Router();
const upload = require('../config/cloudinary')
const {profileView, editView, uploadImage, createPostView, createPost} = require('../controllers')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
})

router.get('/profile', ensureLoggedIn(), profileView)

router.get('/edit-image', editView)
router.post('/edit-image', upload.single('photoURL'), uploadImage)

//Para paths
router.get('/post', createPostView)
router.post('/post', upload.single('postImage'), createPost)
router.get('/edit-post')

module.exports = router;
