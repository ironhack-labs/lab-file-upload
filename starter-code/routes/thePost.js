const express = require('express')
const router = express.Router()

const multer = require('multer')
const Post = require('../models/thePost')

const uploadCloud = require('../configs/cloudinary.config');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');



router.get('/', (req, res, next) => {
    Post.find()
        .then((posts) => res.render('posts/index', {
            posts
        }))
        .catch((error) => console.log(error))
});

router.get('/upload', ensureLoggedIn('/login'), (req, res, next) => res.render('posts/upload'));
router.post('/upload', uploadCloud.single('imgFile'), (req, res, next) => {
    const {
        content
    } = req.body
    const imgPath = req.file.url
    const imgName = req.file.originalname
    Post.create({
            content: content,
            imgPath:imgPath,
            imgName:imgName
        })
        .then(movie => res.redirect('/posts'))
        .catch(error => console.log(error))
});


module.exports = router