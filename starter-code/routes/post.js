const express = require('express')
const router = express.Router()

const multer = require('multer')
const Post = require('../models/post')
const User = require('../models/user')

const uploadCloud = require('../configs/cloudinary.config');

router.get('/new', (req, res, next) => res.render('posts/new'));



router.get('/', (req, res, next) => {
    Post.find()
        .then((posts) => res.render('posts/index', { posts }))
        .catch((error) => console.log(error))
});



// router.use((req, res, next) => {
//     console.log(req.session.currentUser)
//     req.session.currentUser ? next() : res.redirect("/login")
//   })

router.get('/new', (req, res, next) => res.render('posts/new'));
router.post('/new', uploadCloud.single('picFile'), (req, res, next) => {
    const { content } = req.body
    const picPath = req.file.url
    const picName = req.file.originalname
    Post.create({ content, picName, picPath })
        .then( x => res.redirect('/posts'))
        .catch(error => console.log(error))
});


module.exports = router



  
