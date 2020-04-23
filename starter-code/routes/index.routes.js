const express = require('express')
const router = express.Router()

const multer = require('multer')
const uploadLocal = multer({ dest: './public/uploads/posts' })
const uploadCommentLocal = multer({ dest: './public/uploads/posts/comments' })
const Post = require('../models/Post.model')
const User = require('../models/User.model');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

/* GET home page. */
router.get('/', (req, res) => {
    Post.find().sort({ updatedAt: -1 }).limit(24)
        .populate('creatorId')
        .then(allPosts => {
            res.render('index', { posts: allPosts })
        })
        .catch(error => next(new Error(error)))
})

router.get('/create-post', ensureLoggedIn(), (req, res) => res.render('posts/create'))

router.post('/create-post', ensureLoggedIn(), uploadLocal.single('imageFile'), (req, res, next) => {
    const { content, picName } = req.body
    Post.create({ content, picName, creatorId: req.user._id, picPath: `/uploads/posts/${req.file.filename}` })
        .then(res.redirect('/'))
        .catch(error => next(new Error(error)))
})

router.get('/post/:postId', (req, res) => {
    Post.findById(req.params.postId)
        .populate('creatorId')
        .then(foundPost => {
            res.render('posts/details', foundPost)
        })
        .catch(error => next(new Error(error)))
})

router.get('/comment/:postId', ensureLoggedIn(), (req, res, next) => {
    Post.findById(req.params.postId)
        .then(foundPost => res.render('posts/comment', foundPost))
        .catch(error => next(new Error(error)))
})

router.post('/comment/:postId', ensureLoggedIn(), uploadCommentLocal.single('imageFile'), (req, res, next) => {
    Post.findOne({ _id: req.params.postId })
        .then(foundPost => {

            const comments = foundPost.comments

            const newComment = {
                content: req.body.content,
                authorId: req.user._id,
                imagePath: '',
                imageName: req.body.imageName
            }
            if (req.file) {
                newComment.imagePath = `/uploads/posts/comments/${req.file.filename}`
            }

            foundPost.comments.push(newComment)

            Post.findByIdAndUpdate({ _id: foundPost._id }, { comments: foundPost.comments }, { new: true })
                .then(updatedPost => res.redirect(`/post/${updatedPost._id}`))
                .catch(error => next(new Error(error)))
        })
        .catch(error => next(new Error(error)))
})

module.exports = router
