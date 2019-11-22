const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const Post = require('../models/post.model')
const multer = require('multer')
const uploadCloud = require('../configs/cloudinary.config');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');


// Lista de Posts
router.get('/', (req, res) => {
    Post.find()
        .populate('creatorId')
        .then(allPosts => res.render('posts/posts-index', {
            posts: allPosts
        }))
        .catch(err => console.log("Error consultando la BBDD: ", err))
});

// Nuevo Post: renderizar formulario
router.get('/new', ensureLoggedIn('/posts'), (req, res) => {
    Post.find()
        .then(thePost => res.render('posts/newPost', {
            post: thePost
        }))
})

// Nuevo Post enviar formulario
router.post('/new', uploadCloud.single('picPath'), (req, res) => {
    const picPath = req.file.url
    //const picName = req.file.originalname
    const {
        content, picName
    } = req.body

    Post.create({
            content,
            creatorId: req.user._id,
            picPath,
            picName
        })
        .then(x => res.redirect('/posts'))
        .catch(err => 'error: ' + err)
})


module.exports = router;