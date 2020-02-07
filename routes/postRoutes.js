const router = require('express').Router()
const upload = require('../config/cloudinary')

const {
    newView,
    newPost,
    editView,
    editPost,
    detailView,
    commentPost
} = require('../controllers/post.controller')

router.get('/new', newView)
router.post(
    '/new', 
    upload.single('imgPost'),
    newPost
    )

router.get('/edit/:id', editView)
router.post(
    '/edit/:id', 
    upload.single('imgPost'),
    editPost
    )

router.get('/show/:id', detailView)

router.post(
    '/comment/:id',
    upload.single('imgPath'), 
    commentPost)

module.exports = router