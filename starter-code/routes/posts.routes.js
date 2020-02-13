const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require("../models/User.model")
const Post = require("../models/post.model")
const Comment = require("../models/comment.model")

// Multer setup
const multer = require('multer')
const upload = multer({ dest: './public/uploads/' })

const checkLoggedIn = (req, res, next) => req.user ? next() : res.render('index', {
    loginErrorMessage: 'Acceso restringido'
})

router.get('/', (req, res) =>
    Post.find().populate('creatorId')
        .then(posts => {
            console.log(posts)
            res.render('posts/posts-index', { posts })
        })
        .catch(err => console.log(`Error al buscar los posts en la BD ${err}`))
)



router.get('/new', checkLoggedIn, (req, res) => res.render('posts/posts-new'))


router.post('/new', upload.single('phototoupload'), (req, res, next) => {

    const newPost = {

        picPath: `/uploads/${req.file.filename}`,

        content: req.body.content,

        picName: req.file.originalname,

        creatorId: req.user._id

    }

    Post.create(newPost)
        .then(newpost => {
            res.redirect("/posts")

        })
        .catch(err => console.log("error al subir el post", err))

})

router.get('/edit/:id', (req, res) =>
    Post.findById(req.params.id)
        .then(post => {
            console.log(post)
            res.render('posts/posts-edit', post)
        })
        .catch(err => console.log(`Error al buscar el post en la BD ${err}`))
)
router.post('/edit/:id', upload.single('phototoupload'), (req, res) => {
    req.file ? null : req.file = {}

    let updPost = {
        content: req.body.content,
        picPath: `/uploads/${req.file.filename}`,
        picName: req.body.picName
    }
    Post.findByIdAndUpdate(req.params.id, updPost)
        .then(post => res.redirect('/posts'))
        .catch(err => console.log(`Error al editar el post en la BD ${err}`))
})

router.get('/delete/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(post => res.redirect('/posts'))
        .catch(err => console.log(`Error al borrar el post en la BD ${err}`))
})

router.get('/details/:id', (req, res) => {
    const commentPromise = Comment.find({ postId: req.params.id })
    const postPromise = Post.findById(req.params.id).populate('creatorId')

    Promise.all([commentPromise, postPromise])
        .then(results => res.render('posts/posts-details', { post: results[1], comments: results[0] }))
        .catch(err => console.log(err))
})


module.exports = router