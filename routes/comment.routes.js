const express = require('express')
const router = express.Router()

const routeGuard = require('../configs/route-guard.config')

const upload = require('../configs/cloudinary')

const {
    addComment,
} = require('../controllers/comment')

router.post('/posts/:postId/comment', routeGuard, upload.single('image'), addComment)

module.exports = router