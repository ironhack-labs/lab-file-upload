const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const secure = require('../configs/passport.config');

const multer = require('multer');
// Route to upload from project base path
const upload = multer({
  dest: './public/uploads/'
});

router.get('/', postController.index);
router.get('/new', secure.isAuthenticated, postController.create);
router.post('/', secure.isAuthenticated, upload.single('photo'), postController.doCreate);
// router.post('/:id/', secure.isAuthenticated, postController.doUpdate);

module.exports = router;