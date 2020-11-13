const express = require('express');
const router = express.Router();
const {
  newComment,
  createComment
} = require('../controllers/comment')
const fileUploader = require('../configs/cloudinary');

router.get('/:id/new-comment', newComment)

router.post('/:id/new-comment', fileUploader.single('image'), createComment)

module.exports = router